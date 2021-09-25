import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => {
  return (
    <div>
      <h2>Info</h2>
      <p>Details: {props.detail}</p>
    </div>
  );
};

const withAdminWarning = (WrapperComponent) => {
  return (props) => {
    return (
      <>
        <div>This is Admin warning</div>
        <WrapperComponent {...props} />
      </>
    );
  };
};

const requireAuthentication = (WrapperComponent) => {
  return (props) => {
    return (
      <>
        <div>This is Admin warning</div>
        {props.isAuthenticated ? (
          <WrapperComponent {...props} />
        ) : (
          <p>Please Login</p>
        )}
      </>
    );
  };
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated detail={"This is working"} />,
  document.getElementById("root")
);
