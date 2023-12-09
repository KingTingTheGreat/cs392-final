import styled from "styled-components";

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: purple;
	border-radius: 0.75rem;
	padding: 0.5rem;
`;

const ErrorHeader = styled.h3`
	color: red;
	font-size: 1.5rem;
	font-weight: 600;
	padding: 0.5rem;
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 1rem;
	font-weight: 500;
	padding: 0.5rem;
`;

export const Error = () => {
	return (
		<ErrorWrapper>
			<ErrorHeader>Error</ErrorHeader>
			<ErrorMessage>Please disable your ad blocker.</ErrorMessage>
		</ErrorWrapper>
	);
};
