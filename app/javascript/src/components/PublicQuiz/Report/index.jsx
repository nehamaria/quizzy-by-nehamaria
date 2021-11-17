import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import attemptApi from "apis/attempt";

import Table from "./Table";

const Report = () => {
  const [reports, setReports] = useState();
  const [loading, setLoading] = useState(true);
  const fetchReportDetails = async () => {
    setLoading(true);
    try {
      const response = await attemptApi.getDetails();
      setReports(response.data.reports.reports);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchReportDetails(), []);
  if (loading) return <PageLoader />;

  return (
    <>
      {reports.length > 0 ? (
        <Table reports={reports} />
      ) : (
        <div>No reports found</div>
      )}
    </>
  );
};

export default Report;
