import {  scroller } from "react-scroll";
import { FormattedMessage } from "react-intl";
import BackButton from "./BackButton";
import LangHeader from "./LangHeader";

export default function Header({
  isBlogIdView,
  isNewpostView,
  isProfileView,
  onBack,
  onLoginClick,
  onSignOutClick,
  onProfileClick,
  userAuthenticated,
}) {

  const handleScroll = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      duration: 500,
    });
  };

  return (
    <header>
      <div className="genera-header">
        <nav>
          <ul>
            {/*Header in different views*/}
            {isNewpostView ? (
              <>
                <BackButton onBack={onBack} />
                <LangHeader  />
              </>
            ) : isBlogIdView ? (
              <>
                <BackButton onBack={onBack} />
                <LangHeader  />
              </>
            ) : isProfileView ? (
              <>
                <BackButton onBack={onBack} />
                <LangHeader />
              </>
            ) : (
              <>
                <li>
              {/*Complete header*/}
                  <button className="header-button" onClick={() => handleScroll("GeneraHome")}>
                    <FormattedMessage id="header.home" defaultMessage="Home" />
                  </button>
                </li>
                <li>
                  <button className="header-button" onClick={() => handleScroll("GeneraServices")}>
                    <FormattedMessage
                      id="header.services"
                      defaultMessage="Our Services"
                    />
                  </button>
                </li>
                <li>
                  <button className="header-button" onClick={() => handleScroll("GeneraAboutUs")}>
                    <FormattedMessage
                      id="header.aboutUs"
                      defaultMessage="About Us"
                    />
                  </button>
                </li>
                <li>
                  <button className="header-button" onClick={() => handleScroll("GeneraTestimonials")}>
                    <FormattedMessage
                      id="header.testimonials"
                      defaultMessage="Testimonials"
                    />
                  </button>
                </li>
                <li>
                  <button className="header-button" onClick={() => handleScroll("GeneraBlog")}>
                    <FormattedMessage
                      id="header.blog"
                      defaultMessage="Blog/News"
                    />
                  </button>
                </li>
                <li>
                  <button className="header-button" onClick={() => handleScroll("GeneraContact")}>
                    <FormattedMessage
                      id="header.contact"
                      defaultMessage="Contact"
                    />
                  </button>
                </li>
                {userAuthenticated ? (
                  <>
                    <li>
                      <button onClick={onSignOutClick} className="header-button">
                        <FormattedMessage
                          id="header.signOut"
                          defaultMessage="Sign Out"
                        />
                      </button>
                    </li>
                    <li>
                      <button onClick={onProfileClick} className="header-button ">
                        <FormattedMessage
                          id="header.profile"
                          defaultMessage="Profile"
                        />
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button onClick={onLoginClick} className="header-button ">
                      <FormattedMessage
                        id="header.login"
                        defaultMessage="Login"
                      />
                    </button>
                  </li>
                )}
                <LangHeader />
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
