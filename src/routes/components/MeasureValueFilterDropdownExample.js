// (C) 2007-2020 GoodData Corporation
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { PivotTable, Model, MeasureValueFilterDropdown } from "@gooddata/react-components";

// import "@gooddata/react-components/styles/css/main.css";
import { projectId, franchisedSalesIdentifier, locationNameDisplayFormIdentifier } from "../utils/fixtures";

const franchisedSalesMeasure = Model.measure(franchisedSalesIdentifier)
    .format("#,##0")
    .localIdentifier("franchisedSales")
    .title("Franchised Sales");
const measures = [franchisedSalesMeasure];

const attributes = [Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("locationName")];

const defaultMeasureValueFilter = Model.measureValueFilter("franchisedSales");

const DropdownButton = ({ isActive, measureTitle, onClick, onCancel }) => {
    const className = classNames(
        "gd-mvf-dropdown-button",
        "s-mvf-dropdown-button",
        "gd-button",
        "gd-button-secondary",
        "button-dropdown",
        "icon-right",
        { "icon-navigateup": isActive, "icon-navigatedown": !isActive },
    );

    return (
        <button className={className} onClick={onClick} onCancel={onCancel}>
            {measureTitle}
        </button>
    );
};

DropdownButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    measureTitle: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export class MeasureValueFilterDropdownExample extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    state = {
        displayDropdown: false,
        filters: [defaultMeasureValueFilter],
    };

    onApply = filter => {
        this.setState({ filters: [filter], displayDropdown: false });
        console.log("MeasureFilterDropdownComponent onApply");
    };

    onCancel = () => {
        this.setState({ displayDropdown: false });
        console.log("MeasureFilterDropdownComponent onCancel");
    };

    toggleDropdown = () => {
        console.log(this.state);
        this.setState(state => ({ ...state, displayDropdown: !state.displayDropdown }));
        console.log("MeasureFilterDropdownComponent onClick");
        console.log(this.state);
    };

    render() {
        const { filters, displayDropdown } = this.state;
        return (
            <React.Fragment>
                <div ref={this.ref}>
                    <DropdownButton
                        onClick={this.toggleDropdown}
                        isActive={displayDropdown}
                        measureTitle="Measure"
                    />
                </div>
                {displayDropdown ? (
                    <MeasureValueFilterDropdown
                        onApply={this.onApply}
                        onCancel={this.onCancel}
                        filter={filters[0]}
                        anchorEl={this.ref.current}
                    />
                ) : null}
                <hr className="separator" />
                <div style={{ height: 300 }} className="s-pivot-table">
                    <PivotTable
                        projectId={projectId}
                        measures={measures}
                        rows={attributes}
                        filters={filters}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default MeasureValueFilterDropdownExample;
