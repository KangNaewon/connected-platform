import { useCallback } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";
import { panelName } from "../../constants/panelName";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserInfo } from "../../context/UserContext";

export const useProfileSelect = (handlePopupOpen) => {
  const { authTokens, setProfileAccessToken } = useAuth(); 
  const navigate = useNavigate();
  const {setProfileID} = useUserInfo();

  return useCallback(
    async (profileId) => {
      try {
        const response = await request(`/profile/switch/${profileId}`, "POST", {}, {}, authTokens.access_token);

        debugLog("ProfileSelect[I]: switched profile", response);

        setProfileAccessToken(response.token);
        setProfileID(profileId);
        navigate(panelName.main, {});

      } catch (error) {
        debugLog("ProfileSelect[E]: failed to switch profile", {error: error});
        handlePopupOpen("Invalid Profile")
      }
    },
    [authTokens.access_token, navigate, setProfileAccessToken, setProfileID, handlePopupOpen]
  );
};

export const useProfileDelete = (handlePopupOpen) => {
  const { authTokens } = useAuth(); 
  const { setProfileList } = useUserInfo(); 

  return useCallback(
    async (profileId) => {
      try {
        const response = await request(
          `/profile/${profileId}`, 
          "DELETE", 
          {}, 
          {}, 
          authTokens.access_token
        );

        if (response) {
          debugLog("ProfileDelete[I]: deleted profile", response);

          // 성공적으로 삭제 후, 로컬 프로필 목록에서 제거
          setProfileList((prevList) =>
            prevList.filter((profile) => profile.profile_id !== profileId)
          );

          handlePopupOpen(response.message);
        } else {
          handlePopupOpen(response.message);
          throw new Error(response.message || "Failed to delete profile");
        }
      } catch (error) {
        debugLog("ProfileDelete[E]: failed to delete profile", { error });
        handlePopupOpen("Failed to delete profile");
      }
    },
    [authTokens.access_token, handlePopupOpen, setProfileList]
  );
};

export const useProfileAdd = (handlePopupOpen, setAddField) => {
  const { authTokens } = useAuth(); // 인증 토큰 가져오기
  const { setProfileList } = useUserInfo(); // 프로필 목록 업데이트를 위한 함수

  return useCallback(
    async (profileName) => {
      try {
        const response = await request(
          "/profile", // 프로필 생성 API
          "POST",
          { profile_name: profileName }, // 요청 바디에 새로운 프로필 이름 전달
          {},
          authTokens.access_token
        );

        if (response && response.new_profile) {
          debugLog("ProfileAdd[I]: added new profile", response);

          // 성공적으로 생성 후, 로컬 프로필 목록에 추가
          setProfileList((prevList) => [...prevList, response.new_profile]);
        
          handlePopupOpen(response.message);
        } else {
          handlePopupOpen(response.message);
          throw new Error(response.message || "Failed to add profile");
        }
      } catch (error) {
        debugLog("ProfileAdd[E]: failed to add profile", { error });
        handlePopupOpen("Error!");
      } finally {
        setAddField(false);
      }
    },
    [authTokens.access_token, handlePopupOpen, setProfileList, setAddField]
  );
};

export const useProfileEdit = (handlePopupOpen, setEditField, setEditLoading) => {
  const { authTokens } = useAuth(); // 인증 토큰 가져오기
  const { userInfo, setProfileList } = useUserInfo(); // 유저 정보와 프로필 목록 관리
  const profileList = userInfo.profile_list;

  return useCallback(
    async (oldProfile, newProfile) => {
      setEditLoading(true);

      const old_profile = profileList.find(
        (profile) => profile.profile_name === oldProfile
      );
      console.log(old_profile);

      if (!old_profile) {
        handlePopupOpen("No matching profile found!");
        setEditField(false);
        return;
      }

      try {
        const response = await request(
          `/profile/${old_profile.profile_id}`,
          "PATCH",
          { profile_name: newProfile }, // 새 프로필 이름
          {},
          authTokens.access_token // 인증 토큰
        );

        if (response && response.updated_profile) {
          debugLog("ProfileEdit[S]: Profile updated successfully");
          console.log('old', old_profile);
          console.log('new', response.updated_profile);

          const updated_profile = userInfo.profile_list.map((profile) => 
            profile.profile_id == old_profile.profile_id
              ? {...profile, ...response.updated_profile}
              : profile
          );
          setProfileList(updated_profile);

          setEditLoading(false);
          handlePopupOpen(response.message || "Profile updated successfully!");
        } else {
          debugLog("ProfileEdit[F]: No result");
          setEditLoading(false);
          handlePopupOpen("Failed to update profile!");
        }
      } catch (error) {
        debugLog("ProfileEdit[E]: Update failed", { error });
        setEditLoading(false);
        handlePopupOpen("An error occurred!");
      } finally {
        setEditField(false);
      }
    },
    [authTokens.access_token, profileList, setProfileList, handlePopupOpen, setEditField]
  );
};