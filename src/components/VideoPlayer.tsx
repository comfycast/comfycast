import '@videojs/html/video/player';
import '@videojs/html/video/minimal-skin';
import '@videojs/html/media/hlsjs-video';

import { API_URL } from 'astro:env/client';
import { type Component } from 'solid-js';

interface Props {
	id: string;
}

const VideoPlayer: Component<Props> = (props) => {
	const src = () => `${API_URL}/stream/${props.id}/master.m3u8`;

	return (
		<video-player>
			<video-minimal-skin>
				<hlsjs-video attr:src={src()} bool:playsinline={true} />
			</video-minimal-skin>
		</video-player>
	);
};

export default VideoPlayer;
