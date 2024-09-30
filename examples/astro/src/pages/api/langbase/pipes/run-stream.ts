import {mapMetaEnvToProcessEnv} from './../../../../lib/utils';
import getPipeSummary from '../../../../../baseai/pipes/summary';
import {Pipe} from '@baseai/core';
import type {APIRoute} from 'astro';

export const POST: APIRoute = async ({request}) => {
	const runOptions = await request.json();

	// 1. Initiate the Pipe.
	const pipe = new Pipe(getPipeSummary());

	// 2. Run the Pipe.
	const {stream, threadId} = await pipe.run(runOptions);

	// 3. Return the ReadableStream directly.
	return new Response(stream, {
		status: 200,
		headers: {
			'lb-thread-id': threadId ?? '',
		},
	});
};
