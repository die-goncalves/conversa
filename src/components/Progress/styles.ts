import * as ProgressRadix from '@radix-ui/react-progress'
import styled from 'styled-components'

export const ProgressContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 0;
  z-index: 99999;
`
export const ProgressRoot = styled(ProgressRadix.Root)`
  position: relative;
  display: flex;
  overflow: hidden;
  background: var(--gray-800);
  box-shadow: var(--shadow);
  border-radius: 2px;
  left: 0;
  right: 0;
  height: 2px;
  padding: 0 2px;

  /* Fix overflow clipping in Safari */
  /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
  transform: translateZ(0);
`

export const ProgressIndicator = styled(ProgressRadix.Indicator)`
  height: 2px;
  border-radius: 1px;
  align-self: center;

  &[data-state='indeterminate'] {
    background: var(--violet-300);
    animation: slide-in-left 2s ease-in-out infinite alternate both;
  }

  @media (min-width: 320px) {
    width: 80px;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);

    @keyframes slide-in-left {
      0% {
        margin-left: 0;
      }
      100% {
        margin-left: calc(100% - 80px);
      }
    }
  }
  @media (min-width: 640px) {
    width: 128px;
    transition: transform 330ms cubic-bezier(0.65, 0, 0.35, 1);

    @keyframes slide-in-left {
      0% {
        margin-left: 0;
      }
      100% {
        margin-left: calc(100% - 128px);
      }
    }
  }
`
