import React from "react";
import VisitUser from "../VisitUser/VisitUser";
import VisitInstitution from "../VisitInstitution/VisitInstitution";

const Visited = () => {
  return <div>{false ? <VisitUser /> : <VisitInstitution />}</div>;
};

export default Visited;
