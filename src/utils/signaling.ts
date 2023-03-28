import {
  ref,
  set,
  onChildAdded,
  type Unsubscribe,
  push,
  update
} from 'firebase/database'
import { database } from '../services/firebaseConfig'

export const servers = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302'
      ]
    }
  ],
  iceCandidatePoolSize: 10
}

export function listeners(
  participants: Array<
    [
      string,
      {
        peerConnection: RTCPeerConnection
      }
    ]
  >,
  callId: string,
  userId: string
): {
  unsubscribeVideoOffer: Unsubscribe
  unsubscribeVideoAnswer: Unsubscribe
  unsubscribeCallerCandidates: Unsubscribe
  unsubscribeCalleeCandidates: Unsubscribe
} {
  const unsubscribeVideoOffer = onChildAdded(
    ref(database, `rooms/${callId}/users/${userId}/video-offer`),
    async snapshot => {
      if (snapshot.exists() && snapshot.key !== null) {
        const participant = participants.find(p => p[0] === snapshot.key)

        if (participant !== undefined) {
          const peerConnection = participant[1].peerConnection

          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(snapshot.val())
          )
          await handleVideoOfferMsg(
            peerConnection,
            callId,
            userId,
            snapshot.key
          )
        }
      }
    }
  )

  const unsubscribeVideoAnswer = onChildAdded(
    ref(database, `rooms/${callId}/users/${userId}/video-answer`),
    async snapshot => {
      if (snapshot.exists()) {
        const participant = participants.find(p => p[0] === snapshot.key)

        if (participant !== undefined) {
          const peerConnection = participant[1].peerConnection

          const answerDescription = new RTCSessionDescription(snapshot.val())
          await peerConnection.setRemoteDescription(answerDescription)
        }
      }
    }
  )

  const unsubscribeCallerCandidates = onChildAdded(
    ref(database, `rooms/${callId}/users/${userId}/caller-candidates`),
    async snapshot => {
      const callerId = snapshot.val().caller
      if (snapshot.exists()) {
        const participant = participants.find(p => p[0] === callerId)

        if (participant !== undefined) {
          const peerConnection = participant[1].peerConnection
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(snapshot.val())
          )
        }
      }
    }
  )

  const unsubscribeCalleeCandidates = onChildAdded(
    ref(database, `rooms/${callId}/users/${userId}/callee-candidates`),
    async snapshot => {
      const calleeId = snapshot.val().callee
      if (snapshot.exists()) {
        const participant = participants.find(p => p[0] === calleeId)

        if (participant !== undefined) {
          const peerConnection = participant[1].peerConnection
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(snapshot.val())
          )
        }
      }
    }
  )

  return {
    unsubscribeVideoOffer,
    unsubscribeVideoAnswer,
    unsubscribeCallerCandidates,
    unsubscribeCalleeCandidates
  }
}

export async function handleMakeCall(
  peerConnection: RTCPeerConnection,
  roomId: string,
  calleeId: string,
  callerId: string
): Promise<void> {
  const sdpOffer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(sdpOffer)

  peerConnection.onicecandidate = event => {
    event.candidate != null &&
      set(
        push(
          ref(database, `rooms/${roomId}/users/${calleeId}/caller-candidates`)
        ),
        {
          ...event.candidate.toJSON(),
          caller: callerId
        }
      ).catch(error => {
        console.error(`Failed to send ice candidate to ${calleeId}`, error)
      })
  }

  const videoOffer = {
    sdp: sdpOffer.sdp,
    type: sdpOffer.type
  }
  await set(
    ref(database, `rooms/${roomId}/users/${calleeId}/video-offer/${callerId}`),
    videoOffer
  )
}

async function handleVideoOfferMsg(
  peerConnection: RTCPeerConnection,
  roomId: string,
  calleeId: string,
  callerId: string
): Promise<void> {
  const sdpAnswer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(sdpAnswer)

  peerConnection.onicecandidate = event => {
    event.candidate != null &&
      set(
        push(
          ref(database, `rooms/${roomId}/users/${callerId}/callee-candidates`)
        ),
        {
          ...event.candidate.toJSON(),
          callee: calleeId
        }
      ).catch(error => {
        console.error(`Failed to send ice candidate to ${callerId}`, error)
      })
  }

  const videoAnswer = {
    sdp: sdpAnswer.sdp,
    type: sdpAnswer.type
  }
  await set(
    ref(database, `rooms/${roomId}/users/${callerId}/video-answer/${calleeId}`),
    videoAnswer
  )
}

export function updateMedia(
  roomId: string,
  userId: string,
  newMedia: { audio: boolean } | { video: boolean }
): void {
  const mediaRef = ref(database, `rooms/${roomId}/users/${userId}/media`)

  update(mediaRef, newMedia).catch(error => {
    console.error('Failed to update configuration media', error)
  })
}

export function createPeerConnection(stream: MediaStream): RTCPeerConnection {
  const peerConnection = new RTCPeerConnection(servers)

  stream.getTracks().forEach((track: MediaStreamTrack) => {
    peerConnection.addTrack(track, stream)
  })
  return peerConnection
}
