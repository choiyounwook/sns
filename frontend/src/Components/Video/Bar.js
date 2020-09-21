import React from "react";
import styled from "styled-components";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  const BarBox = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
  `
  const Time = styled.span`
    font-size:4vw;
    padding:0 3vw;
  `

  const TimeRight = styled.span`
    font-size:4vw;
    padding:0 3vw;
    float:right;
  `

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <BarBox>
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, #FF6F61, ${curPercentage}%, white 0)`,
          padding:`2vw 0px`
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >
        <Time
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        >{formatDuration(curTime)}</Time>
        <TimeRight className="bar__time" style={{float:"right"}}>{formatDuration(duration)}</TimeRight>
      </div>
    </BarBox>
  );
}
