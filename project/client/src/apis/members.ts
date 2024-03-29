import Api from "./api";

/**
 * 회원가입 - 완료
 * @param data
 * @returns
 */

export const postSignUp = async (data: MemberData) => {
  try {
    return await Api.post("members/sign-up", data);
  } catch (error) {
    console.error("Error in Post Sign-up:", error);
    throw new Error("Failed to SignUp");
  }
};

/**
 * 로그인 - 완료
 * @param data
 * @returns token - header: Authorization, Refresh
 */

export const postLogIn = async (data: MemberLogIn) => {
  try {
    return await Api.post("/user/log-in", data);
  } catch (error) {
    console.error("Error in Post Log-in:", error);
    throw new Error("Failed to LogIn");
  }
};

/**
 * 로그아웃 - 완료
 * @param accessToken
 * @returns
 */
export const postLogOut = async (accessToken: string | null) => {
  if (accessToken) {
    try {
      return await Api.post("/members/log-out", null, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Post Log-out:", error);
      throw new Error("Failed to LogOut");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 아이디 중복확인 - 완료
 * @param data
 * @returns
 */
export const postUserNameCheck = async (data: { userName: string }) => {
  try {
    return await Api.post("/members/id-check", data);
  } catch (error) {
    console.error("Error in Post Id Check:", error);
    throw new Error("Failed to ID Check");
  }
};

/**
 * 닉네임 중복확인 - 완료
 * @param data
 * @returns
 */
export const postNicknameCheck = async (data: { nickname: string }) => {
  try {
    return await Api.post("/members/nickname-check", data);
  } catch (error) {
    console.error("Error in Post Nickname Check:", error);
    throw new Error("Failed to Nickname Check");
  }
};

/**
 * 회원탈퇴 - 완료
 * @param { accessToken }
 * @returns
 */
export const deleteMember = async (accessToken: string | null) => {
  if (accessToken) {
    try {
      return await Api.delete(`/members`, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Delete Member:", error);
      throw new Error("Failed to Drop Out of Membership");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 회원 정보 수정 - 완료
 * @param { data: MemberData, accessToken: string | null }
 * @returns
 */
export const patchMember = async ({
  data,
  accessToken,
}: {
  data: MemberPatchData;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.patch(`/members`, data, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Patch Member:", error);
      throw new Error("Failed to Modify Member Info");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 타 회원 정보 조회 - 완료
 * @param { memberId: number, accessToken: string | null }
 * @returns { OtherMemberResponse }
 */
export const getMember = async ({
  memberId,
  accessToken,
}: {
  memberId: number | null;
  accessToken: string | null;
}): Promise<OtherMemberResponse> => {
  if (accessToken && memberId) {
    try {
      const response = await Api.get(`/members/${memberId}`, {
        headers: { Authorization: accessToken },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get Member:", error);
      throw new Error("Failed to Check Member Info");
    }
  }
  throw new Error("Missing Access Token or Member Id");
};

/**
 * 내 정보 조회 - 완료
 * @param accessToken
 * @returns { data: MemberInfo }
 */
export const getMyPage = async (
  accessToken: string | null,
): Promise<MemberResponse> => {
  if (accessToken) {
    try {
      const response = await Api.get(`/members/my-page`, {
        headers: { Authorization: accessToken },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get MyPage:", error);
      throw new Error("Failed to Check My Info");
    }
  }
  throw new Error("Missing Token");
};

/**
 * 내 독서기록 조회 - 테스트 필요
 * @param { params: MemberPostsAndBooksParams, accessToken: string | null }
 * @returns { MemberPostsResponse }
 */
export const getMyPosts = async ({
  params,
  accessToken,
}: {
  params: MemberPostsAndBooksParams;
  accessToken: string | null;
}): Promise<MemberPostsResponse> => {
  if (accessToken) {
    try {
      const response = await Api.get(`/members/my-page/postInfo`, {
        params,
        headers: { Authorization: accessToken },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get MyPosts:", error);
      throw new Error("Failed to Check My Posts Info");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 내 독서정보 조회 - 완료
 * @param { params: MemberPostsAndBooksParams, accessToken: string | null }
 * @returns { MemberPlansResponse }
 */
export const getMyPlans = async ({
  params,
  accessToken,
}: {
  params: MemberPostsAndBooksParams;
  accessToken: string | null;
}): Promise<MemberPlansResponse> => {
  if (accessToken) {
    try {
      const response = await Api.get(`/members/my-page/bookmarkInfo`, {
        params,
        headers: { Authorization: accessToken },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get MyPlans:", error);
      throw new Error("Failed to Check My Plans Info");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 타 회원의 독서기록 조회 - 테스트 필요
 * @param {params: MemberPostsAndBooksParams, accessToken: string | null, memberId: number }
 * @returns { MemberPostsResponse }
 */
export const getMemberPosts = async ({
  params,
  accessToken,
  memberId,
}: {
  params: MemberPostsAndBooksParams;
  accessToken: string | null;
  memberId: number | null;
}): Promise<MemberPostsResponse> => {
  if (accessToken && memberId) {
    try {
      const response = await Api.get(`/members/${memberId}/postInfo`, {
        params,
        headers: { Authorization: accessToken },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get Member's Posts:", error);
      throw new Error("Failed to Check Member's Posts Info");
    }
  }
  throw new Error("Missing Access Token or Member Id");
};

/**
 * 타 회원 독서 정보 조회 - 테스트 필요
 * @param { params: MemberPostsAndBooksParams, accessToken: string | null, memberId: number }
 * @returns { MemberPlansResponse }
 */
export const getMemberPlans = async ({
  params,
  accessToken,
  memberId,
}: {
  params: MemberPostsAndBooksParams;
  accessToken: string | null;
  memberId: number | null;
}): Promise<MemberPlansResponse> => {
  if (accessToken && memberId) {
    try {
      const response = await Api.get(`/members/${memberId}/bookmarkInfo`, {
        params,
        headers: { Authorization: accessToken },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get Member's Plans:", error);
      throw new Error("Failed to Check Member's Plans Info");
    }
  }
  throw new Error("Missing Access Token or Member Id");
};

/**
 * 멤버 팔로우 - 테스트 필요
 * @param { memberId: number, accessToken: string | null }
 * @returns { success: boolean }
 */
export const patchMemberFollow = async ({
  memberId,
  accessToken,
}: {
  memberId: number;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.patch(`/members/${memberId}/follow`, null, {
        headers: { Authorization: accessToken },
      });
    } catch (error) {
      console.error("Error in Patch Member Follow:", error);
      throw new Error("Failed to Modify Member Follow");
    }
  }
  throw new Error("Missing Access Token");
};
