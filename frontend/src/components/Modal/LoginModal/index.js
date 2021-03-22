import React from 'react';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import * as Styled from './styles';
import Icon from '../../../icons';
import { connect } from 'react-redux';
import { googleLogin } from '../../../actions/auth';
import { hideModal } from '../../../actions/modal';
import favicon_img from '../../../images/favicon.png';
import { warningRed } from '../../../constants';

const LoginModal = ({ hideModal, googleLogin, facebookLogin, isAuthenticated }) => {
  const handleSocialLogin = (response) => {
    try {
      googleLogin(response);
      // facebookLogin(response);
    } catch (e) {
      console.log(e);
    } finally {
      hideModal();
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img className="mx-auto h-16 w-auto" src={favicon_img} alt="logo" />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-700">Northwestern-exclusive community</p>
      </div>
      <div className="text-center w-full p-2 bg-purple-50 text-gray-900 text-sm flex justify-center items-center">
        <Icon
          icon={['fad', 'exclamation-circle']}
          style={{ color: '#ea4235', marginRight: '8px', width: '20px', height: '20px' }}
        />
        <span>We are currently only allowing Northwestern email logins for the safety of our community.</span>
      </div>
      <GoogleLogin
        clientId="945324056638-a59e6v72lh2easqbmlv6dqvie7sn1hk6.apps.googleusercontent.com"
        render={(renderProps) => (
          <Styled.FacebookButton onClick={renderProps.onClick}>
            <Icon icon={['fab', 'google']} style={{ color: warningRed, marginRight: '10px' }} />
            Login with Google
          </Styled.FacebookButton>
        )}
        onSuccess={handleSocialLogin}
        onFailure={() => console.log('google login failed')}
        hostedDomain={'u.northwestern.edu'}
      />
      {/* <FacebookLogin
        appId="244367473819130"
        fields="name, email, picture"
        callback={handleSocialLogin}
        render={(renderProps) => (
          <Styled.FacebookButton onClick={renderProps.onClick}>
            <Icon icon={['fab', 'facebook']} style={{ color: '#1778f2', marginRight: '10px' }} />
            Login with Facebook
          </Styled.FacebookButton>
        )}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  googleLogin: (response) => dispatch(googleLogin(response)),
  // facebookLogin: (response) => dispatch(facebookLogin(response)),
  hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
