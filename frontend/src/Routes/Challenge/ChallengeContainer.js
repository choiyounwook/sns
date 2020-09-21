import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ChallengePresenter from "./ChallengePresenter";
import { useQuery } from "react-apollo-hooks";
import { CHALLENGE } from "./ChallengeQueries";

export default withRouter(({ location: { search } }) => {
  const id = search.split("?")[1];
  const { data, loading } = useQuery(CHALLENGE, {
    variables: {
      id,
    },
  });
  const [create, setCreate] = useState(false);
  const [selHashtags, setSelHashtags] = useState("");
  const [pid, setPid] = useState("");
  const [cat, setCat] = useState("");
  const isDetail = true;

  return (
    <ChallengePresenter
      loading={loading}
      data={data}
      create={create}
      setCreate={setCreate}
      selHashtags={selHashtags}
      setSelHashtags={setSelHashtags}
      pid={pid}
      setPid={setPid}
      cat={cat}
      setCat={setCat}
      isDetail={isDetail}
    />
  );
});
