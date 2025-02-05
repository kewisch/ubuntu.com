import React, { useContext } from "react";
import { Card, Col, List, Row } from "@canonical/react-components";
import classNames from "classnames";
import RadioCard from "../RadioCard";
import {
  isPublicCloud,
  LTSVersions,
} from "advantage/subscribe/react/utils/utils";
import OlderVersionModal from "./OlderVersionModal";
import {
  defaultValues,
  FormContext,
} from "advantage/subscribe/react/utils/FormContext";

const livepatch = "Kernel Livepatch to avoid unscheduled reboots";
const landscape = "Ubuntu systems management with Landscape";
const knowledgeBase = "Knowledge base access";
const KVMDrivers = "Certified Windows drivers for KVM guests";
const CISBenchmark = "CIS benchmark";
const CISBenchmarkAndAutomation = "CIS benchmark and automation tooling";
const FIPS =
  "Certified compliance with FIPS 140-2 Level 1 certified crypto modules validated by NIST";
const DISA = "DISA STIG";
const CommonCriteria = "Common Criteria EAL2";
const ESMEndDate = "Extended Security Maintenance (ESM) until ";
const MicrosoftActiveDirectory =
  "Advanced Group Policy Object support for Microsoft Active Directory on Ubuntu Desktops";

const versionDetails = {
  22.04: [
    `${ESMEndDate} 2032`,
    livepatch,
    KVMDrivers,
    CISBenchmarkAndAutomation,
    landscape,
    knowledgeBase,
    MicrosoftActiveDirectory,
  ],
  20.04: [
    `${ESMEndDate} 2030`,
    livepatch,
    KVMDrivers,
    FIPS,
    CISBenchmarkAndAutomation,
    landscape,
    knowledgeBase,
    MicrosoftActiveDirectory,
  ],
  18.04: [
    `${ESMEndDate} 2028`,
    livepatch,
    landscape,
    knowledgeBase,
    KVMDrivers,
    FIPS,
    CISBenchmarkAndAutomation,
    DISA,
  ],
  16.04: [
    `${ESMEndDate} 2026`,
    livepatch,
    landscape,
    knowledgeBase,
    KVMDrivers,
    FIPS,
    CommonCriteria,
    CISBenchmarkAndAutomation,
    DISA,
  ],
  14.04: [
    `${ESMEndDate} 2024`,
    livepatch,
    landscape,
    knowledgeBase,
    KVMDrivers,
    CISBenchmark,
  ],
};

const Version = () => {
  const { version, setVersion, productType } = useContext(FormContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(event.target.value as LTSVersions);
  };

  return (
    <div
      className={classNames({
        "u-disable": isPublicCloud(productType),
      })}
      data-testid="wrapper"
    >
      <p>
        <OlderVersionModal />
      </p>
      <Row>
        <Col size={12} className="radio-wrapper--staggering">
          <RadioCard
            name="version"
            value={LTSVersions.jammy}
            selectedValue={version}
            handleChange={handleChange}
            className="p-card--radio--version"
          >
            <h4>Ubuntu 22.04 LTS</h4>
          </RadioCard>
          <RadioCard
            name="version"
            value={LTSVersions.focal}
            selectedValue={version}
            handleChange={handleChange}
            className="p-card--radio--version"
          >
            <h4>Ubuntu 20.04 LTS</h4>
          </RadioCard>
          <RadioCard
            name="version"
            value={LTSVersions.bionic}
            selectedValue={version}
            handleChange={handleChange}
            className="p-card--radio--version"
          >
            <h4>Ubuntu 18.04 LTS</h4>
          </RadioCard>
          <RadioCard
            name="version"
            value={LTSVersions.xenial}
            selectedValue={version}
            handleChange={handleChange}
            className="p-card--radio--version"
          >
            <h4>Ubuntu 16.04 LTS</h4>
          </RadioCard>
          <RadioCard
            name="version"
            value={LTSVersions.trusty}
            selectedValue={version}
            handleChange={handleChange}
            className="p-card--radio--version"
          >
            <h4>Ubuntu 14.04 LTS</h4>
          </RadioCard>
        </Col>
      </Row>
      <Row>
        <Col size={12}>
          <Card
            title={
              <h3 className="p-heading--4 p-card__title">
                For Ubuntu {version}, all UA plans include:
              </h3>
            }
            className="version-features-section"
          >
            <Row>
              <Col size={12}>
                <List
                  items={versionDetails[version ?? defaultValues.version]}
                  split
                  ticked
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Version;
