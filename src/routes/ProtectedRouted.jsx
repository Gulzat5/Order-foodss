import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRouted = ({
  component: Comment,
  fallBacPath,
  isAllowed,
}) => {
  if (!isAllowed) {
    return <Navigate to={fallBacPath} />;
  }
  return (
    <div>
      <Comment />
    </div>
  );
};
