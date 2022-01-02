import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { CustomModal } from "..";
import {
  AddSupportFunctions,
  AddSupportTargetMeasure,
  EditSupportSuccessIndicator,
} from ".";
import {
  deleteSupportFunction,
  deleteSupportSuccessIndicator,
  getCreateEvaluation,
  setCurrentId,
  setTargetIndicator,
} from "../../store/createEvaluation";

export default function SupportFunctions() {
  const evaluations = useSelector(getCreateEvaluation);
  const dispatch = useDispatch();
  const { supportFunctions } = evaluations;

  const [showEditSuccessIndicator, setShowEditSuccessIndicator] =
    useState(false);
  const [showAddSupportFunctions, setShowAddSupportFunctions] = useState(false);
  const [showAddSupportTargetMeasure, setShowAddSupportTargetMeasure] =
    useState(false);

  return (
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <td className="p-4">
              <TableHeader>Statement of Functions</TableHeader>
            </td>
            <td className="p-4">
              <TableHeader>Success Indicators (Target Measure)</TableHeader>
            </td>
            <td className="p-4">
              <TableHeader>Actual Accomplishments</TableHeader>
            </td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">
              <TableHeader>Support Functions - 10%</TableHeader>
            </td>
            <td></td>
            <td></td>
            <td>
              <Button onClick={() => setShowAddSupportFunctions(true)}>
                Add
              </Button>
            </td>
            <td></td>
          </tr>
          {supportFunctions?.map((suppFunc) => (
            <React.Fragment key={suppFunc?.id}>
              <tr key={suppFunc?.id}>
                <td className="px-4 p-3">
                  <h6 className="m-0">
                    {suppFunc?.title} ({suppFunc?.percentage}%)
                  </h6>
                  {suppFunc?.description && (
                    <Description className="mt-2">
                      {suppFunc?.description}
                    </Description>
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      dispatch(setCurrentId(suppFunc?.id));
                      return setShowAddSupportTargetMeasure(true);
                    }}
                  >
                    Add
                  </Button>
                </td>
                <td></td>
                <td></td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch(
                        deleteSupportFunction({
                          id: suppFunc?.id,
                          supportFunctionsMeasure: parseInt(
                            suppFunc?.percentage
                          ),
                        })
                      )
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              {suppFunc?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td className="p-4"></td>
                  <td className="p-4">
                    <Description>{successIndicator?.title}</Description>
                  </td>
                  <td className="p-4">
                    {successIndicator?.actualAccomplishments?.title}
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        dispatch(
                          setTargetIndicator({
                            funcId: suppFunc?.id,
                            indicatorId: successIndicator?.id,
                          })
                        );
                        return setShowEditSuccessIndicator(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch(
                          deleteSupportSuccessIndicator({
                            funcId: suppFunc?.id,
                            indicatorId: successIndicator?.id,
                          })
                        )
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      {/* modal */}
      <CustomModal
        heading="Support Functions"
        show={showAddSupportFunctions}
        onHide={() => setShowAddSupportFunctions(false)}
      >
        <AddSupportFunctions open={setShowAddSupportFunctions} />
      </CustomModal>
      {/* add support target measure */}
      <CustomModal
        heading="Add Succcess Indicator (Target Measure)"
        show={showAddSupportTargetMeasure}
        onHide={() => setShowAddSupportTargetMeasure(false)}
      >
        <AddSupportTargetMeasure open={setShowAddSupportTargetMeasure} />
      </CustomModal>
      {/* edit success indicator */}
      <CustomModal
        heading="Edit Success Indicator"
        show={showEditSuccessIndicator}
        onHide={() => setShowEditSuccessIndicator(false)}
      >
        <EditSupportSuccessIndicator open={setShowEditSuccessIndicator} />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div``;

const TableHeader = styled.h5`
  margin: 0;
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const Description = styled.p`
  max-width: 35ch;
`;