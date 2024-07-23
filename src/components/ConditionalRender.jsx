import React from "react";

const ConditionalRender = ({ children, isError, isLoading }) => {
  if (isLoading) {
    return "Loading List....";
  }

  if (isError) {
    return "Opps! something went wrong";
  }

  return <>{children}</>;
};

export default ConditionalRender;
