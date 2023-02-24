import React from "react";
import classes from "./DisplayedItemContent.module.css";
import ContentSection from "./ContentSection/ContentSection.js";
import ScenarioDescription from "./ScenarioDescription/ScenarioDescription.js";
import ReturnNextPrevNav from "./ReturnNextPrevNav";

function DisplayedItemContent(props) {
  function RenderReturnNextPrevNav() {
    return (
      <ReturnNextPrevNav
        setSelectedItemContent={props.setSelectedItemContent}
        localizationData={props.localizationData}
        setDisplayContentItem={props.setDisplayContentItem}
        selectedItemContent={props.selectedItemContent}
        selectedScenarioList={props.selectedScenarioList}
      ></ReturnNextPrevNav>
    );
  }

  function RenderContentSection() {
    return (
      <ContentSection
        selectedItemContent={props.selectedItemContent}
        selectedLanguage={props.selectedLanguage}
        setSelectedItemContent={props.setSelectedItemContent}
        localizationData={props.localizationData}
        setUserTrainingHistory={props.setUserTrainingHistory}
        userTrainingHistory={props.userTrainingHistory}
        setDisplayContentItem={props.setDisplayContentItem}
      />
    );
  }

  function RenderScenarioDescription() {
    return (
      <ScenarioDescription
        selectedItemContent={props.selectedItemContent}
        setwebCamTrainingActive={props.setwebCamTrainingActive}
        selectedLanguage={props.selectedLanguage}
        localizationData={props.localizationData}
        setSelectedItemContent={props.setSelectedItemContent}
        setUserTrainingHistory={props.setUserTrainingHistory}
        userTrainingHistory={props.userTrainingHistory}
        setDisplayContentItem={props.setDisplayContentItem}
      />
    );
  }

  if (
    !props.selectedItemContent.content &&
    !props.selectedItemContent.instructions
  ) {
    return <div className={classes.itemcontentcomponent}>wait</div>;
  } else {
    return (
      <div className={classes.itemcontentcomponent}>
        {!props.selectedItemContent.content === false ? (
          <RenderContentSection />
        ) : (
          <></>
        )}
        {!props.selectedItemContent.instructions === false ? (
          <RenderScenarioDescription />
        ) : (
          <></>
        )}
        <div className={classes.scenariolistrightsidefiller}></div>
        <RenderReturnNextPrevNav />
      </div>
    );
  }
}

export default DisplayedItemContent;
