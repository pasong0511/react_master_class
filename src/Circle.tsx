import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

const Container = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 2px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor, text = "기본값" }: CircleProps) {
    const [value, setValue] = useState<number | string>(0);

    useEffect(() => {
        setValue(1);
        setValue("2");
    });

    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    );
}

export default Circle;
