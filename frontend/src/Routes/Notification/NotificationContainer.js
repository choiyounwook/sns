import React, { useState } from "react";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import NotificationPresenter from "./NotificationPresenter";
import { USER } from "./NotificationQueries";
import { ME } from "../../SharedQueries";

export default withRouter(() => {
  const meQuery = useQuery(ME);
  var username = "";
  if (meQuery.data.me) {
    username = meQuery.data.me.username;
    console.log(username);
  }
  const { data, loading} = useQuery(USER, {
    variables: {
      username,
    },
  });

  return <NotificationPresenter loading={loading} data={data} />;
});
