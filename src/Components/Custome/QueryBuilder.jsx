import React, { useState } from 'react';
import './QueryBuilder.css';

const QueryBuilder = () => {
    // State to manage selected options
    const [field, setField] = useState('ALL');
    const [operator, setOperator] = useState(' ');
    const [value, setValue] = useState('ALL');

    // Event handler for OK button click
    const handleOkClick = () => {
        console.log('OK button clicked');
        // You can perform further actions here based on selected options
    };

    // Event handler for Reset button click
    const handleResetClick = () => {
        console.log('Reset button clicked');
        // Reset state or perform any other reset actions
        setField('ALL');
        setOperator(' ');
        setValue('ALL');
    };

    // Options for selects
    const fieldOptions = [
        { value: 'ALL', label: 'Select Field' },
        { value: 'field1', label: 'Field 1' },
        { value: 'field2', label: 'Field 2' },
        { value: 'field3', label: 'Field 3' }
    ];

    const operatorOptions = [
        { value: ' ', label: 'Operator' },
        { value: 'equals', label: '=' },
        { value: 'not_equals', label: '!=' },
        { value: 'greater_than', label: '>' },
        { value: 'less_than', label: '<' }
    ];

    const valueOptions = [
        { value: 'ALL', label: 'Select Value' },
        { value: 'value1', label: 'Value 1' },
        { value: 'value2', label: 'Value 2' },
        { value: 'value3', label: 'Value 3' }
    ];

    return (
        <div style={{ width: '40vh', height: '26vh',backgroundColor:'#EEEEEE'}}>
            <div>
                <div className="container">
                    <div className="field-row">
                     <label>Select Field</label>
                     <div> <select value={field} onChange={(e) => setField(e.target.value)} style={{ marginBottom: '10px' }}>
                    {fieldOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select></div>
                    </div>
                    <div className="field-row">
                     <label>Select Operator</label>
                     <div><select value={operator} onChange={(e) => setOperator(e.target.value)} style={{ marginBottom: '10px' }}>
                    {operatorOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select></div>
                    </div>
                    <div className="field-row">
                     <label>Select Value</label>
                     <div> <select value={value} onChange={(e) => setValue(e.target.value)} style={{ marginBottom: '10px' }}>
                    {valueOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select></div>
                    </div>
                    <div className="field-row">
                        <button onClick={handleOkClick} style={{ padding: '5px 10px', backgroundColor: '#ffffff', color: '#151515', border: 'none', cursor: 'pointer' }}>Query Data</button>
                        <button onClick={handleResetClick} style={{ padding: '5px 10px', backgroundColor: '#ffffff', color: '#151515', border: 'none', cursor: 'pointer' }}>Reset</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default QueryBuilder;