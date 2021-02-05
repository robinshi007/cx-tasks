//import styled from 'styled-components';
import tw, { styled } from 'twin.macro';

export const ErrorPage = styled.div(() => [tw`p-10`]);

export const ErrorPageInner = styled.div(() => [tw`mx-auto py-20 text-gray-600 w-96`]);

export const ErrorBox = styled.div(() => [
  tw`flex flex-col items-center justify-center border border-gray-200 p-4 rounded`,
]);

export const Title = styled.h1(() => [tw`mt-4 text-xl mb-4 font-semibold`]);
