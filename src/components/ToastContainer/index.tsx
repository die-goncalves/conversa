import * as Portal from '@radix-ui/react-portal'

import { StyledToastContainer } from './styles'
import 'react-toastify/dist/ReactToastify.min.css'

export function ToastContainer(): JSX.Element {
  return (
    <Portal.Root
      asChild
      container={document.body}
      style={{ pointerEvents: 'auto' }}
    >
      <StyledToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        closeButton={({ closeToast, theme }) => (
          <button
            className={`Toastify__close-button ${
              theme === 'light'
                ? 'Toastify__close-button--light'
                : 'Toastify__close-button--dark'
            }`}
            onClick={closeToast}
            type="button"
            aria-label="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="M480 618 270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618Z" />
            </svg>
          </button>
        )}
        icon={({ type }) => {
          switch (type) {
            case 'error': {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M355 936q-12 0-23.5-5T312 918L138 744q-8-8-13-19.5t-5-23.5V451q0-12 5-23.5t13-19.5l174-174q8-8 19.5-13t23.5-5h250q12 0 23.5 5t19.5 13l174 174q8 8 13 19.5t5 23.5v250q0 12-5 23.5T822 744L648 918q-8 8-19.5 13t-23.5 5H355Zm125-161q14 0 24.5-10.5T515 740q0-14-10.5-24.5T480 705q-14 0-24.5 10.5T445 740q0 14 10.5 24.5T480 775Zm0-144q13 0 21.5-8.5T510 601V398q0-13-8.5-21.5T480 368q-13 0-21.5 8.5T450 398v203q0 13 8.5 21.5T480 631ZM355 876h250l175-175V451L605 276H355L180 451v250l175 175Zm125-300Z" />
                </svg>
              )
            }
            case 'success': {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="m421 667-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635 453L421 667Zm59 309q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
                </svg>
              )
            }
            case 'info': {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M483.175 776q12.825 0 21.325-8.625T513 746V566q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T453 566v180q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625Zm-3.193-314q14.018 0 23.518-9.2T513 430q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447 430q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
                </svg>
              )
            }
            case 'default': {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-60q142.375 0 241.188-98.812Q820 718.375 820 576q0-68-25.48-130.688-25.48-62.687-73.256-110.5L480.264 576V236Q338 236 239 334.812 140 433.625 140 576t98.812 241.188Q337.625 916 480 916Z" />
                </svg>
              )
            }
            case 'warning': {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M92 936q-9 0-15.652-4.125Q69.696 927.75 66 921q-4.167-6.6-4.583-14.3Q61 899 66 891l388-670q5-8 11.5-11.5T480 206q8 0 14.5 3.5T506 221l388 670q5 8 4.583 15.7-.416 7.7-4.583 14.3-3.696 6.75-10.348 10.875Q877 936 868 936H92Zm52-60h672L480 296 144 876Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5Zm0-111q12.825 0 21.325-8.625T514 678V514q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T454 514v164q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM480 586Z" />
                </svg>
              )
            }
            default: {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M266 779h429q10 0 14-8t-2-16L590 599q-5-6-12-6t-12 6L446 754l-81-111q-5-6-12-6t-12 6l-86 112q-5 8-1.5 16t12.5 8Zm-86 157q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z" />
                </svg>
              )
            }
          }
        }}
      />
    </Portal.Root>
  )
}
