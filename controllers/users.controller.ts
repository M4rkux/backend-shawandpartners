import { Request, Response } from 'express';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.TOKEN
});

function extractNumber(link: string | undefined): Number {

  if (!link) return 0;

  const regex = /since=(\d+)/;
  const match = regex.exec(link);
  
  if (match && match[1]) {
    return Number(match[1]);
  }
  return 0;
}

export async function listUsers(req: Request, res: Response) {
  const since = Number(req.query.since || 0);

  if (isNaN(since)) return res.status(500).send('The param "since" must be a number');

  const response = await octokit.request(`GET /users?since=${since}`);
  const nextSince = extractNumber(response.headers.link);

  const responseData = {
    list: response.data,
    next: `/api/users?since=${nextSince}`
  }
  
  res.send(responseData);
}

export async function getUser(req: Request, res: Response) {
  const { username } = req.params;

  if (!username) return res.status(500).send('The username is required');

  const response = await octokit.request(`GET /users/{username}`, {
    username
  });

  res.send(response.data);
}

export async function listRepos(req: Request, res: Response) {
  const { username } = req.params;

  if (!username) return res.status(500).send('The username is required');

  const response = await octokit.request(`GET /users/{username}/repos`, {
    username
  });

  res.send(response.data);
}