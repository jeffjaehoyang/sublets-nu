import React from 'react';
import FullHeightContainer from '../components/Container/FullHeightContainer';

const Privacy = () => {
  return (
    <FullHeightContainer>
      <div className="flex flex-col">
        <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</div>
        <div className="text-base sm:text-xl font-normal mb-6">
          Names and Visibility: Member profiles are not made accessible to others. Your profile is only visible to you.
        </div>
        <div className="text-base sm:text-xl font-normal mb-6">
          Sign Up Process: Sublets.nu authenticates users through the following ways: 1. Valid email addresses, OR 2.
          Facebook or Google integrated social authentication. USERS WHO SIGN UP WITH STUDENT EMAIL ADDRESSES: Members
          who sign up with valid school email addresses will be listed as "Verified Students" beneath their first names.
          They may also choose to publicize their Facebook accounts to other Members. Facebook accounts will be made
          visible to Members ONLY. USERS WHO SIGN UP WITH FACEBOOK: If a Member registers with their Facebook account,
          Sublets.nu will automatically offer a direct link to the User's Facebook page. This link will be made visible
          to Members ONLY and cannot be hidden. This is to allow full transparency within our community and keep Members
          safe. If you are a student, please consider signing up with a valid school email address.
        </div>
        <div className="text-base sm:text-xl font-normal mb-6">
          Areas Beyond Sublet.nu’s Control: Our Website allows you to register using social networking platforms and to
          interact with and through those social networks. We do not monitor these exchanges and are not liable for
          agreements and transactions made through the usage of our platform and elsewhere. Sublets.nu or its creators
          will not be held liable for any damages that arise from the utilization of our Website, even if the Website
          and its creators are made aware of the potential damages in advance. Sublets.nu does not actively review
          outside links that are included within our Website or shared between Members. Outside links do not indicate
          endorsements by Sublets.nu and are accessed at the risk of the Users. Sublets.nu is not affiliated with
          Northwestern University.
        </div>
      </div>
    </FullHeightContainer>
  );
};

export default Privacy;
