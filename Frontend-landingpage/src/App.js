import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/authContext.js";
import { useError } from "./context/errorContext.js";
import AuthModal from "./components/Authentication/AuthModal.jsx";
import Blog from "./components/BlogComponents/Blog.jsx";
import BlogId from "./components/BlogComponents/BlogId.jsx";
import ConfirmModal from "./components/Parts/ConfirmModal.jsx";
import Contact from "./components/Sections/ContactComponents/Contact.jsx";
import ErrorModal from "./components/Parts/ErrorModal.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Header from "./components/Layout/HeaderParts/Header.jsx";
import Inicio from "./components/Sections/Inicio.jsx";
import Informacion from "./components/Sections/Informacion.jsx";
import Loader from "./components/Parts/Loader.jsx";
import NewPost from "./NewPost-View/NewPost.jsx";
import Profile from "./components/Sections/UserComponents/Profile.jsx";
import Servicios from "./components/Sections/ServicesComponents/Servicios.jsx";
import SectionTestimonials from "./components/Sections/TestimonialComponents/SectionTestimonials.jsx";
import SuccesModal from "./components/Parts/SuccessModal.jsx";
import NewTestimonios from "./components/Sections/TestimonialComponents/NewTestimonios.jsx";
import NewServices from "./components/Sections/ServicesComponents/NewServices.jsx";
import { useView } from "./context/viewContext.js";

export default function App() {
  //Blog
  const [blogPostId, setBlogPostId] = useState(null);
  const [newpostView, setNewPostView] = useState(null);
  const [editpostView, setEditPostView] = useState(null);
  const [rol, setRol] = useState(null);

  //Authentication
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  //Modal
  const [confirm, setConfirm] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //Sections
  const [profile, setProfile] = useState(false);
  const [newService, setNewService] = useState(null);
  const [newTestimonialView, setNewTestimonialView] = useState(null);

  //Firebase and error Modal
  const { SignOut, userAuthenticated } = useAuth();
  const { setError } = useError();

  //Loader
  const [loader, setLoader] = useState(false);

  //Views
  const { view, setView } = useView();

  useEffect(() => {}, [editpostView]);

  useEffect(() => {
    if (view) {
      setView(true);
    } else {
      setView(false);
      setProfile(false);
    }
  }, [view]);

  //Header
  const handleSignOutClick = async () => {
    try {
      await SignOut();
      setView(null);
      window.location.reload();
      window.scrollTo({
        top: 0,
      });
    } catch (error) {
      setModalMessage("error.signOut");
      setErrorModal(true);
    }
  };

  const handleProfileClick = async () => {
    setView(true);
    setProfile(true);
  };

  const handleBackToBlog = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setBlogPostId(false);
      setNewPostView(false);
      setEditPostView(null);
      setNewTestimonialView(false);
      setNewService(false);
      const storedView = JSON.parse(localStorage.getItem("view"));
      if (storedView && profile) {
        setView(false);
        setProfile(false);
      } else {
        if (storedView) {
          setProfile(true);
          setView(true);
        } else {
          setView(false);
          setProfile(false);
        }
      }
      window.scrollTo({
        top: 0,
      });
    }, 300);
  };

  // Blog ID and New Post
  const handleReadMore = (postId, user) => {
    setRol(user);
    setBlogPostId(postId);
    setProfile(false)
  };

  const handleNewPost = (postSelected) => {
    setLoader(true);
    setTimeout(() => {
      if (!postSelected) {
        setEditPostView(null);
        setNewPostView(true);
        setLoader(false);
      } else {
        setEditPostView(postSelected);
        setNewPostView(true);
        setLoader(false);
      }
      setProfile(false);
      window.scrollTo({
        top: 0,
      });
    }, 300);
  };

  // Modals
  //1. Authentication
  const handleLoginClick = () => {
    setLogin(true);
    setSignUp(false);
    setError(false);
  };

  const handleSignUpClick = () => {
    setLogin(false);
    setSignUp(true);
    setError(false);
  };
  //2. General Modals
  const handleCloseModal = () => {
    setLogin(false);
    setSignUp(false);
    setError(false);
    setConfirmModal(false);
  };

  const handleCloseConfirmModal = () => {
    setConfirm(false);
    window.location.reload();
    window.scrollTo({
      top: 0,
    });
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <AuthProvider>
      {loader ? (
        <Loader duration={3000} />
      ) : (
        <>
          <Header
            isBlogIdView={!!blogPostId}
            isNewpostView={newpostView}
            isProfileView={profile}
            onBack={handleBackToBlog}
            onLoginClick={handleLoginClick}
            onSignOutClick={handleSignOutClick}
            onProfileClick={handleProfileClick}
            userAuthenticated={userAuthenticated}
          />
          <main>
            {!blogPostId && !newpostView && !profile && (
              <>
                <Inicio />
                <Servicios
                  setModalMessage={setModalMessage}
                  setErrorModal={setErrorModal}
                  setConfirm={setConfirmModal}
                />
                <Informacion
                  setModalMessage={setModalMessage}
                  setErrorModal={setErrorModal}
                />
                <SectionTestimonials
                  setModalMessage={setModalMessage}
                  setConfirm={setConfirmModal}
                  setErrorModal={setErrorModal}
                />
                <Blog
                  onReadMore={handleReadMore}
                  onNewPost={handleNewPost}
                  setModalMessage={setModalMessage}
                />
                <Contact />
                <Footer />
              </>
            )}
            {/*Views*/}
            {blogPostId && (
              <BlogId
                _id={blogPostId}
                setModalMessage={setModalMessage}
                setErrorModal={setErrorModal}
                rol={rol}
              />
            )}
            {newpostView && (
              <NewPost
                setModalMessage={setModalMessage}
                setConfirm={setConfirmModal}
                setErrorModal={setErrorModal}
                postSelected={editpostView}
              />
            )}

            {profile && (
              <Profile
                onNewPost={handleNewPost}
                onReadMore={handleReadMore}
                setModalMessage={setModalMessage}
                setErrorModal={setErrorModal}
                setConfirm={setConfirmModal}
              />
            )}
            {/**/}
            {newTestimonialView && <NewTestimonios />}
            {newService && <NewServices />}
            {/*Modals*/}
            <SuccesModal
              isOpen={confirm}
              onClose={handleCloseConfirmModal}
              modalMessage={modalMessage}
            />
            <ErrorModal
              isOpen={errorModal}
              onClose={handleCloseErrorModal}
              modalMessage={modalMessage}
            />
            <ConfirmModal
              isOpen={confirmModal}
              setConfirm={setConfirm}
              onClose={handleCloseModal}
            />
          </main>
          {/*Auth Modals*/}
          {login || signUp ? (
            <AuthModal
              handleCloseModal={handleCloseModal}
              onLoginClick={handleLoginClick}
              onSignUpClick={handleSignUpClick}
              isSignUp={signUp}
            />
          ) : null}
        </>
      )}
    </AuthProvider>
  );
}
