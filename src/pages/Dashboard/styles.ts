import styled from 'styled-components'

export const DashboardContainer = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100svh;

  overflow: auto;
  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 1vw;
    height: 1vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: var(--gray-600);
    box-shadow: var(--shadow-lg);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-700);
    box-shadow: var(--shadow-md);
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: var(--gray-800);
    box-shadow: var(--shadow);
  }
  &::-webkit-scrollbar-track {
    background: var(--gray-900);
  }

  @media (min-width: 320px) {
    background: var(--gray-800);
  }
  @media (min-width: 640px) {
    background: var(--gray-900);
  }
`

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  & > div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 320px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 320px) {
    padding: 1rem 1rem 0;
  }
  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem 0;
  }
`

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    font-family: 'Montserrat', sans-serif;

    @media (min-width: 320px) {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
    }
    @media (min-width: 640px) {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    fieldset {
      display: flex;
      flex-direction: column;
      border: 0;

      legend {
        margin-bottom: 0.5rem;
      }

      & > div {
        display: flex;
        justify-content: space-around;
        /* justify-content: space-between; */

        & + div {
          margin-left: 1rem;
        }

        input[type='radio'] {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;

          &:focus-visible + label {
            border-color: var(--violet-300);
          }

          &:checked + label svg {
            fill: var(--violet-300);
            filter: drop-shadow(0px 0.3px 0.7px rgba(196, 181, 253, 0.141))
              drop-shadow(0px 1.1px 2.2px rgba(196, 181, 253, 0.209))
              drop-shadow(0px 5px 10px rgba(196, 181, 253, 0.35));
          }

          &:not(:checked) + label:hover svg {
            fill: var(--gray-400);

            filter: drop-shadow(0px 0.3px 0.7px rgba(0, 0, 0, 0.141))
              drop-shadow(0px 1.1px 2.2px rgba(0, 0, 0, 0.209))
              drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.35));
          }
        }

        label {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 5rem;
          border-radius: 4px;
          border: 2px solid transparent;
          padding: 4px;
          gap: 0.5rem;
          cursor: pointer;
          outline: 0;

          transition: border-color 150ms linear;

          svg {
            width: 40px;
            height: 40px;

            transition: fill 150ms linear, filter 150ms linear;
            fill: var(--gray-500);
            filter: drop-shadow(0px 0.2px 0.4px rgba(0, 0, 0, 0.166))
              drop-shadow(0px 0.7px 1.3px rgba(0, 0, 0, 0.244))
              drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.41));
          }
        }
      }

      & > span {
        display: block;
      }
    }

    & > div {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;

      label {
        display: inline-block;
        margin-bottom: 0.5rem;
      }

      input[type='text'] {
        border: 2px solid var(--gray-700);
        width: 100%;
        height: 2.5rem;
        padding: 0 1rem;
        border-radius: 0.25rem;
        background: transparent;
        box-shadow: var(--shadow);

        transition: border-color 150ms linear, box-shadow 150ms linear;
        outline: 0;
        &:focus-visible {
          border-color: var(--violet-300);
          box-shadow: var(--shadow-md);
        }
        &:not(:focus-visible):hover {
          border-color: var(--gray-600);
          box-shadow: var(--shadow-md);
        }
      }

      input[type='file'] {
        position: relative;
        padding: 8px;

        cursor: pointer;

        border-radius: 4px;
        border: 2px dashed var(--gray-700);

        transition: border-color 150ms linear;
        outline: 0;
        &:focus-visible {
          border-color: var(--violet-300);
        }

        &:hover {
          &::file-selector-button {
            background: var(--gray-600);
            box-shadow: var(--shadow-md);
          }
        }

        &::file-selector-button {
          border: 2px solid transparent;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          border-radius: 4px;
          background: var(--gray-700);
          cursor: pointer;

          transition: background-color 150ms linear, border-color 150ms linear,
            box-shadow 150ms linear;

          box-shadow: var(--shadow);

          @media (min-width: 320px) {
            display: block;
            width: 100%;
            margin-bottom: 8px;
            padding: 0;
          }
          @media (min-width: 640px) {
            display: inline-block;
            width: auto;
            margin-bottom: 0;
            padding-right: 1.5rem;
            padding-left: 1.5rem;
          }
          @media (min-width: 768px) {
            display: block;
            width: 100%;
            margin-bottom: 8px;
            padding: 0;
          }
          @media (min-width: 1024px) {
            display: inline-block;
            width: auto;
            margin-bottom: 0;
            padding-right: 1.5rem;
            padding-left: 1.5rem;
          }
        }

        @media (min-width: 640px) {
          height: 3.75rem;
        }
        @media (min-width: 768px) {
          height: auto;
        }
      }
    }

    span[role='alert'] {
      padding: 0 1rem;
      margin-top: 0.25rem;

      font-size: 0.875rem;
      line-height: 1.25rem;
      color: var(--red-300);
    }

    button[type='submit'] {
      border: 2px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      padding-right: 1.5rem;
      padding-left: 1.5rem;
      margin-top: 1rem;
      border-radius: 0.25rem;
      background: var(--gray-700);
      cursor: pointer;
      transition: background-color 150ms linear, border-color 150ms linear,
        box-shadow 150ms linear;

      box-shadow: var(--shadow);
      &:hover {
        background: var(--gray-600);
        box-shadow: var(--shadow-md);
      }

      outline: 0;
      &:focus-visible {
        border-color: var(--violet-300);
      }
    }
  }

  @media (min-width: 320px) {
    width: 100%;
    padding: 1rem;
  }
  @media (min-width: 640px) {
    border-radius: 4px;
    background: var(--gray-800);
    box-shadow: var(--shadow);

    width: 30rem;
    height: fit-content;
    padding: 1.5rem;
  }
  @media (min-width: 768px) {
    width: 100%;
    margin: 2rem;
  }
  @media (min-width: 1024px) {
    width: 30rem;
    margin: 0;
  }
`
