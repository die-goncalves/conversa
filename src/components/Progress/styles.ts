import * as ProgressRadix from '@radix-ui/react-progress'
import styled from 'styled-components'

export const ProgressContainer = styled.div`
  position: absolute;
  width: 100%;
  padding: 0.75rem 0;
`
export const ProgressRoot = styled(ProgressRadix.Root)`
  position: relative;

  display: flex;
  overflow: hidden;
  background: var(--gray-800);
  box-shadow: var(--shadow);
  border-radius: 2px;
  width: 100%;
  height: 8px;
  padding: 2px;

  /* Fix overflow clipping in Safari */
  /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
  transform: translateZ(0);
`

export const ProgressIndicator = styled(ProgressRadix.Indicator)`
  width: 128px;
  height: 4px;
  border-radius: 1px;
  align-self: center;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);

  &[data-state='indeterminate'] {
    background: var(--violet-300);
    animation: slide-in-left 2s ease-in-out infinite alternate both;
  }

  @keyframes slide-in-left {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: calc(100% - 128px);
    }
  }
`
