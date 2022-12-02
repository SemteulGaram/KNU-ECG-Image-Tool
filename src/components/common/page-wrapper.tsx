/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<unknown>;
const PageWrapper: React.FC<Props> = (props) => {
  return (
    <div
      className="page_wrapper relative w-full h-full"
      css={css`
        min-height: 100vh;
      `}
    >
      {props.children}
    </div>
  );
};

export default PageWrapper;
