import '../assets/scss/pages/sign-up.scss'
import ContentCard from './../components/ContentCard';
import SignUpForm from './../components/SignUpForm';

const SignUp = () => {
  return (
    <div className="sign-up-page">
      <ContentCard heading="Sign up">
        <SignUpForm />
      </ContentCard>
    </div>
  )
}

export default SignUp