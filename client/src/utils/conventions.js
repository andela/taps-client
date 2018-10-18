export const githubOptions = (teamName, projectName = 'ah') => (
  [
    { key: `${projectName}-${teamName}-git`, text: `${projectName}-${teamName}`, value: `${projectName}-${teamName}` },
    { key: `${projectName}-${teamName}-back`, text: `${projectName}-${teamName}-backend`, value: `${projectName}-${teamName}-backend` },
    { key: `${projectName}-${teamName}-front`, text: `${projectName}-${teamName}-frontend`, value: `${projectName}-${teamName}-frontend` },
    { key: `${teamName}-${projectName}-hub`, text: `${teamName}-${projectName}`, value: `${teamName}-${projectName}` },
    { key: `${teamName}-${projectName}-backend`, text: `${teamName}-${projectName}-backend`, value: `${teamName}-${projectName}-backend` },
    { key: `${teamName}-${projectName}-frontend`, text: `${teamName}-${projectName}-frontend`, value: `${teamName}-${projectName}-frontend` }
  ]
);

export const ptOptions = (teamName, projectName = 'ah') => (
  [
    { key: `${teamName}-${projectName}-gen`, text: `${teamName}-${projectName}`, value: `${teamName}-${projectName}` },
    { key: `${projectName}-${teamName}-pt`, text: `${projectName}-${teamName}`, value: `${projectName}-${teamName}` }
  ]
);

export const slackOptions = (teamName, projectName = 'ah') => (
  [
    { key: `${projectName}-${teamName}`, text: `${projectName}-${teamName}`, value: `${projectName}-${teamName}` },
    { key: `${teamName}-bots`, text: `${teamName}-bots`, value: `${teamName}-bots` },
    { key: `${teamName}-general`, text: `${teamName}-general`, value: `${teamName}-general` },
    { key: `${teamName}-standups`, text: `${teamName}-standups`, value: `${teamName}-standups` }
  ]
);
