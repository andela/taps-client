export const githubOptions = (teamName, projectName = 'ah') => (
  [
    { key: `${projectName}-${teamName}-frontend`, text: `${projectName}-${teamName}-frontend`, value: `${projectName}-${teamName}-frontend` },
    { key: `${projectName}-${teamName}-git`, text: `${projectName}-${teamName}`, value: `${projectName}-${teamName}` },
    { key: `${teamName}-${projectName}-github`, text: `${teamName}-${projectName}`, value: `${teamName}-${projectName}` },
    { key: `${projectName}-${teamName}-backend`, text: `${projectName}-${teamName}-backend`, value: `${projectName}-${teamName}-backend` }
  ]
);

export const ptOptions = (teamName, projectName = 'ah') => (
  [
    { key: `${projectName}-${teamName}-pt`, text: `${projectName}-${teamName}`, value: `${projectName}-${teamName}` },
    { key: `${teamName}-${projectName}-gen`, text: `${teamName}-${projectName}`, value: `${teamName}-${projectName}` }
  ]
);

export const slackOptions = (teamName, projectName = 'ah') => (
  [
    { key: `${projectName}-${teamName}`, text: `${projectName}-${teamName}`, value: `${projectName}-${teamName}` },
    { key: `${teamName}-general`, text: `${teamName}-general`, value: `${teamName}-general` },
    { key: `${teamName}-standups`, text: `${teamName}-standups`, value: `${teamName}-standups` },
    { key: `${teamName}-bots`, text: `${teamName}-bots`, value: `${teamName}-bots` }
  ]
);
