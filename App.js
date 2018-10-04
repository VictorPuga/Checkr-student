import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import {aws_exports} from 'src/keys';
import App from 'src/app';
// import AWSAppSyncClient from 'aws-appsync';
// import { ApolloProvider } from 'react-apollo';
// import { Rehydrated } from 'aws-appsync-react';

Amplify.configure(aws_exports);

// export const client = new AWSAppSyncClient({
//     url: aws_exports.aws_appsync_graphqlEndpoint,
//     region: aws_exports.aws_appsync_region,
//     auth: {
//         type: aws_exports.aws_appsync_authenticationType,
//         apiKey: aws_exports.aws_appsync_apiKey,
//         credentials: () => Auth.currentCredentials(),
//         jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
//     },
//     defualtOptions: {
//         mutate: {
//             errorPolicy: 'none',
//         },
//     }
// });
export default class WithProvider extends React.Component {
    // async componentWillMount() {
    //     client.initQueryManager();
    //     await client.resetStore();
    // }
    render() {
        return (
            // <ApolloProvider client={client}>
            //     <Rehydrated>
                    <App />
            //     </Rehydrated>
            // </ApolloProvider>
        )
    };
};