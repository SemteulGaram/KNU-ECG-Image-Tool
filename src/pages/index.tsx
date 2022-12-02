import { NextPage } from 'next';
import PageWrapper from '../components/common/page-wrapper';
import usePageStateRoute from 'src/hooks/usePageStateRoute';

const Home: NextPage<unknown> = () => {
  usePageStateRoute();

  return (
    <PageWrapper>
      <div className="index relative w-full h-screen p-8 flex flex-col items-center justify-center">
        <img
          className="w-80 h-80"
          src="/app-icon.png"
          alt="KNU ECG Image Tool"
        />
        <div className="index__title text-4xl font-bold mt-8">
          KNU ECG Image Tool
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
