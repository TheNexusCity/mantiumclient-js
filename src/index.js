
// Auth
const Login = require("./methods/auth/Login");
const Logout = require("./methods/auth/Logout");
const ResetPassword = require("./methods/auth/ResetPassword");

// Ai methods
const ListMethods = require("./methods/ai_methods/ListMethods");

// Ai Engines
const GetAllAiEngines = require("./methods/ai_engines/GetAllAiEngines");
const GetAiEnginesByProvider = require("./methods/ai_engines/GetAiEnginesByProvider");
const GetAiEngineByName = require("./methods/ai_engines/GetAiEngineByName");

const Headers = require("./methods/Headers");
module.exports = {
  api_key: null,
  ai_provider: 'mantium',
  organization: null,

  Auth: (function () {
    /**
    * Summary: Returns Object with bearer_id used for Authorization.
    *
    * @param {object} { username: useremail@somedomain.com , password: p@ssWord! } User's username, password.
    * @return {object} Obtain access token for a user.
    */
    function accessTokenLogin(data) {
      return Login(new Headers(module.exports.api_key, module.exports.organization), data);
    }

    /**
    * Summary: Returns Object as response in the API call.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * 
    * @return {object} Invalidate a user's Access token (logout).
    */
    function revokeToken() {
      return Logout(new Headers(module.exports.api_key, module.exports.organization));
    }

    /**
    * Summary: This method trigger reset password email with a link.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    *
    * @param {object} { email: useremail@somedomain.com } User's email/Login email.
    * @return {object} Provide information with success message.
    */
    function resetPassword(data) {
      return ResetPassword(new Headers(module.exports.api_key, module.exports.organization), data);
    }

    function main() {
      return {
        accessTokenLogin: accessTokenLogin,
        revokeToken: revokeToken,
        resetPassword: resetPassword
      };
    }
    main.accessTokenLogin = accessTokenLogin;
    main.revokeToken = revokeToken;
    main.ResetPassword = ResetPassword;

    return main;
  })(),

  AiMethods: (function () {
    let ai_provider = undefined;

    /**
    * Summary: Get all of the supported ai_methods for a provider.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * @param {object} { page: 1, size: 2 } the query param in the format of key pair.
    * @return {Method} Provide method list in array format.
    */
    function list(queryParam) {
      return ListMethods(new Headers(module.exports.api_key, module.exports.organization), queryParam, ai_provider);
    }

    /**
    * Summary: take provider name to perfom GET AI methods.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * AI Provider name (case sensitive)
    *
    * @param {string} Provider some provider like `openai`, `cohere`, `mantium`, `OpenAI`, `Cohere`, `Mantium`
    * @return {method} This return the method `.listMethods(queryParam)`.
    */
    function main(p) {
      ai_provider = p;
      return {
        list: list
      };
    }
    main.list = list;

    return main;
  })(),

  AiEngines: (function () {
    let name = undefined;

    /**
    * Summary: Get all of the configured and available AI engines.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * @param {object} { page: 1, size: 2 } the query param in the format of key pair.
    * @return {Method} Provide method list in array format.
    */
    function all(queryParam) {
      return GetAllAiEngines(new Headers(module.exports.api_key, module.exports.organization), queryParam);
    }

    /**
    * Summary: List all of the AI Engines for a specific AI Provider.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * @param {object} { page: 1, size: 2 } the query param in the format of key pair.
    * @return {Method} Provide method list in array format.
    */
    function byProvider(queryParam) {
      return GetAiEnginesByProvider(new Headers(module.exports.api_key, module.exports.organization), queryParam, name);
    }

    /**
    * Summary: Get the details for a specific AI Engine.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * @param {object} { page: 1, size: 2 } the query param in the format of key pair.
    * @return {Method} Provide method list in array format.
    */
    function byName(queryParam) {
      return GetAiEngineByName(new Headers(module.exports.api_key, module.exports.organization), queryParam, name);
    }

    /**
    * Summary: take provider or engine name to perfom GET AI Engines.
    * 
    * This mehtod required Header `Authorization: Bearer {bearer_id}`, you can obtain `bearer_id` using `.Auth().accessTokenLogin()` method.
    * AI Provider name (case sensitive), Only one parameter is required either `Provider Name` or `Engine`
    *
    * @param {string} Provider some provider like `openai`, `cohere`, `mantium`, `OpenAI`, `Cohere`, `Mantium`
    * @param {string} Engine AI Engine name.
    * @return {method} This return the method `.listMethods(queryParam)`.
    */
    function main(e) {
      name = e;
      return {
        all: all,
        byProvider: byProvider,
        byName: byName
      };
    }
    main.all = all;
    main.byProvider = byProvider;
    main.byName = byName;

    return main;
  })(),
};