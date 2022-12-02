/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<unknown>;
const PageWrapper: React.FC<Props> = (props) => {
  return (
    <div
      className="page_wrapper relative w-full h-full"
      css={css`
        min-width: 640px;
        min-height: 400px;
      `}
    >
      {props.children}
    </div>
  );
};

export default PageWrapper;
