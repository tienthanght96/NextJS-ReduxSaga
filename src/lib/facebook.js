export function loginFaceBook(callback) {
  if (typeof FB !== "undefined") {
    FB.login(function (response) {
      console.log('response', response)
      if (response.authResponse && response.authResponse.accessToken) {
        const accessToken = response.authResponse.accessToken;
        typeof callback === 'function' && callback(response);
        // FB.getLoginStatus(function(response) {
        //     statusChangeCallback(response);
        // });
        // loginWithServer(accessToken)
        return;
      } else {
        console.log("ko co access token");
        typeof callback === 'function' && callback(null);
      }
    }, {
      scope: 'public_profile,email'
    });
    return;
  }
  typeof callback === 'function' && callback(null);
}

export function getProfileFaceBook(callback) {
  FB.api('/me', {
    fields: "id,name,email,picture"
  }, (response) => {
    typeof callback === 'function' && callback(response);
  });
}

export function refreshLogin(accessToken) {
  // const currentTime = new Date().getTime();

  // if (typeof cookies.get("lastLogin", {path: "/"}) === "undefined") {
  //     cookies.get("lastLogin", {path: "/"});
  //     cookies.set("lastLogin", currentTime, {path: "/"});
  // } else {
  //     const lastLogin = parseInt(cookies.get("lastLogin", {path: "/"}));
  //     if (currentTime - lastLogin > 432000000) {
  //         // loginWithServer(accessToken)
  //         console.log('login lại')
  //     }
  // }

}