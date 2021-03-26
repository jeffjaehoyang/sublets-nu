import React from 'react';
import FullHeightContainer from '../components/Container/FullHeightContainer';

const About = () => {
  return (
    <FullHeightContainer>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl sm:text-4xl font-bold text-purple-900 mb-6">Northwestern, Connected</div>
        <div className="text-center text-base sm:text-xl font-normal sm:w-3/5">
          Sublets.nu started out as a Northwestern-IEEE team project, but is now an individual side project maintained
          by myself. My hope is that this platform serves as a means to simplify room search for Northwestern students.
          Currently, Sublets.nu is completely free & open-sourced, and will always be. As this platform is in its
          earliest stages of development, any feedbacks are greatly appreciated.
        </div>
        <div className="mx-auto font-normal text-base sm:text-xl italic mt-6">Jeff '22</div>
      </div>
    </FullHeightContainer>
  );
};

export default About;
