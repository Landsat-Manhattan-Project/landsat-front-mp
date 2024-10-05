import { Box, Container } from "@mui/material";
import { ThreeCanvas } from "../../../ui/canvas";
import { EarthPlanet } from "../../../planet/ui/earth_planet";
import { Login } from "../../login/ui";
import { Register } from "../../register/ui";
import { LandsatButton } from "../../../ui/button";
import { useAnimations } from "../../../planet/model/use_animations";
import { useState } from "react";

import "./auth.css";
import { useLogin } from "../../login/model/use_login";
import { useRegister } from "../../register/model/use_register";
import { useGeneralAuth } from "../model/use_general_auth";

const AuthTemplate = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [hideModal, setHideModal] = useState(false);
  const [hideButtonModal, setHideButtonModal] = useState(false);

  const {
    zoom,
    backgroundOpacity,
    zoomInAnimation,
    zoomOutAnimation,
    resetZoomOutAnimation,
  } = useAnimations();

  const toggleHideModal = (newValue?: boolean) => {
    setHideModal(newValue ?? !hideModal);
  };

  const toggleHideButtonModal = (newValue?: boolean) => {
    setHideButtonModal(newValue ?? !hideModal);
  };

  const { loginWithoutSession, formData, setFormData } = useGeneralAuth(
    zoomInAnimation,
    zoomOutAnimation,
    toggleHideModal,
    toggleHideButtonModal
  );

  const useLoginComponents = useLogin(
    formData,
    resetZoomOutAnimation,
    zoomInAnimation,
    zoomOutAnimation,
    toggleHideModal,
    toggleHideButtonModal
  );

  const useRegisterComponents = useRegister(
    formData,
    resetZoomOutAnimation,
    zoomInAnimation,
    zoomOutAnimation,
    toggleHideModal,
    toggleHideButtonModal
  );

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: backgroundOpacity,
        }}
      >
        <Box
          component="section"
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "black",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <ThreeCanvas>
            <EarthPlanet isModalHide={hideModal} earthZoom={zoom} />
          </ThreeCanvas>
        </Box>
        {!hideButtonModal && (
          <LandsatButton
            onClick={() => toggleHideModal()}
            text={!hideModal ? "Hide modal" : "Open modal"}
            btnStyleVariant={"btn2"}
            sx={{
              zIndex: 5,
              position: "absolute",
              right: "20px",
              bottom: "20px",
            }}
          />
        )}
        <Container
          maxWidth={"sm"}
          className={`auth-container ${!hideModal ? "" : "fade-out"}`}
          sx={{
            position: "relative",
            p: "0px !important",
            height: "65%",
          }}
        >
          <Box
            className="card-container"
            sx={{
              width: isLoginOpen ? "100%" : "0",
              height: isLoginOpen ? "100%" : "0",
              opacity: isLoginOpen ? "1" : "0",
              overflow: "hidden",
              position: "absolute",
              right: isLoginOpen ? "0" : "20px",
              top: isLoginOpen ? "0" : "20px",
              padding: 0,
            }}
          >
            {isLoginOpen ? (
              <Login
                formData={formData}
                setFormData={setFormData}
                useLogin={useLoginComponents}
                loginAsGuest={loginWithoutSession}
              />
            ) : null}
          </Box>
          <Box
            className="card-container"
            sx={{
              width: !isLoginOpen ? "100%" : "0",
              height: !isLoginOpen ? "100%" : "0",
              opacity: !isLoginOpen ? "1" : "0",
              overflow: "hidden",
              position: "absolute",
              right: !isLoginOpen ? "0" : "20px",
              top: !isLoginOpen ? "0" : "20px",
              padding: 0,
            }}
          >
            {!isLoginOpen ? (
              <Register
                formData={formData}
                setFormData={setFormData}
                useRegister={useRegisterComponents}
                loginAsGuest={loginWithoutSession}
              />
            ) : null}
          </Box>

          <LandsatButton
            onClick={toggleLogin}
            text={isLoginOpen ? "Sign Up" : "Sign In"}
            btnStyleVariant={"btn2"}
            sx={{
              zIndex: 5,
              position: "absolute",
              right: "20px",
              top: "20px",
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export { AuthTemplate };
