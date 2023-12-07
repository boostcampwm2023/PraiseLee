package boostcamp.and07.mindsync.data.network.request

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ProfileSpaceJoinRequest(
    @SerialName("space_uuid")
    val spaceId: String,
)
