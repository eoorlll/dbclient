import '../assets/scss/pages/sign-in.scss'
import ContentCard from './../components/ContentCard';
import SignInForm from './../components/SignInForm';

const SignIn = () => {
  return (
    <div className="sign-in-page">
      <ContentCard heading="Sign in">
        <SignInForm />
      </ContentCard>
    </div>
  )
}

export default SignIn