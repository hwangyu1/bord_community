module.exports = {
  isOwner: function (request, response) {
    try {
      // 현재 사용자가 로그인되어 있는지 확인
      return request.session.is_logined || false;
    } catch (error) {
      console.error("Error in isOwner:", error);
      return false; // 에러 발생 시 로그인되어 있지 않은 것으로 처리
    }
  },

  statusUI: function (request, response) {
    try {
      // 현재 사용자 상태에 따라 다른 UI 반환
      const authStatusUI = this.isOwner(request, response)
        ? `${request.session.nickname}님 환영합니다 <a href="/auth/logout">로그아웃</a>`
        : '<a href="/auth/login">로그인</a> | <a href="/auth/register">회원가입</a>';

      return authStatusUI;
    } catch (error) {
      console.error("Error in statusUI:", error);
      return '로그인 후 사용 가능합니다'; // 에러 발생 시 기본 상태 메시지 반환
    }
  }
};
