import styled from 'styled-components'

export function SkeletonLayout({
  isLargerThan768
}: {
  isLargerThan768: boolean
}): JSX.Element {
  return (
    <RoomDetailContainer>
      {!isLargerThan768 && (
        <StyledHeader>
          <Skeleton
            style={{ borderRadius: '4px' }}
            width="40px"
            height="40px"
          />

          <Skeleton width="80px" height="20px" />
        </StyledHeader>
      )}

      <div>
        <RoomIdSection>
          <h2>Id da sala</h2>
          <Skeleton
            style={{ marginTop: '4px', marginBottom: '16px' }}
            width="280px"
            height="20px"
          />

          <div>
            <Skeleton
              style={{ borderRadius: '4px' }}
              width="280px"
              height="40px"
            />
            <Skeleton
              style={{ borderRadius: '4px' }}
              width="120px"
              height="40px"
            />
          </div>
        </RoomIdSection>

        <ParticipantSection>
          <h2>0 participantes</h2>

          <ParticipantGallery>
            {Array.from({ length: 1 }).map((block, index) => {
              return (
                <Skeleton
                  key={index}
                  style={{
                    border: '2px solid transparent',
                    alignItems: 'center',
                    backgroundColor: 'var(--gray-800)',
                    borderRadius: '4px'
                  }}
                  width="100%"
                  height="3.5rem"
                />
              )
            })}
          </ParticipantGallery>
        </ParticipantSection>

        <ActionSection>
          <h2>Ações do usuário</h2>

          <div>
            <Skeleton
              style={{ borderRadius: '4px', marginBottom: '16px' }}
              width="100%"
              height="40px"
            />

            <Skeleton
              style={{ borderRadius: '4px' }}
              width="100%"
              height="40px"
            />
            <Skeleton
              style={{
                borderRadius: '4px',
                marginBottom: '16px',
                marginTop: '4px'
              }}
              width="200px"
              height="20px"
            />

            <Skeleton
              style={{ borderRadius: '4px' }}
              width="100%"
              height="40px"
            />
            <Skeleton
              style={{
                borderRadius: '4px',
                marginBottom: '16px',
                marginTop: '4px'
              }}
              width="250px"
              height="20px"
            />
          </div>
        </ActionSection>
      </div>
    </RoomDetailContainer>
  )
}

const RoomDetailContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100svh;

  background: var(--gray-900);

  overflow: auto;

  @media (min-width: 320px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > div {
      width: 100%;
    }
  }
`

const RoomIdSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  h2 {
    font-weight: 700;
    font-size: 1rem;
  }

  & > div:last-child {
    display: flex;
    gap: 8px;

    @media (min-width: 320px) {
      flex-direction: column;
      & > div {
        width: 100%;
      }
    }
    @media (min-width: 412px) {
      flex-direction: row;
      & > div:first-child {
        width: 280px;
      }
      & > div:last-child {
        width: 120px;
      }
    }
  }

  & + section {
    @media (min-width: 320px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      margin-top: 1.5rem;
    }
    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    margin-top: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-top: 2rem;
    padding: 0 2rem;
  }
`

const ParticipantSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  & + section {
    @media (min-width: 320px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      margin-top: 1.5rem;
    }
    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    margin-top: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-top: 2rem;
    padding: 0 2rem;
  }
`

const ParticipantGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 320px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const ActionSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  & + section {
    @media (min-width: 320px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      margin-top: 1.5rem;
    }
    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  gap: 1rem;
  @media (min-width: 320px) {
    padding: 1rem;
  }
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`

interface ISkeleton {
  width: string
  height: string
}
const Skeleton = styled.div<ISkeleton>`
  width: ${props => props.width};
  height: ${props => props.height};
  background: var(--gray-800);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`
