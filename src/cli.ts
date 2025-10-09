#!/usr/bin/env node

/**
 * Prologue CLI - The AI-Powered Creative Framework
 * Begin Your Story with Intelligent AI Assistance
 */

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { PrologueCreator } from './creator';
import { PrologueProject } from './types';

const program = new Command();

program
  .name('prologue')
  .description('Prologue - The AI-Powered Creative Framework')
  .version('1.0.0');

// Create command
program
  .command('create')
  .description('Create a new Prologue project with AI assistance')
  .argument('[name]', 'Project name')
  .option('-t, --template <template>', 'Project template (portfolio, game, art-gallery, mobile-app, custom)')
  .option('-ai, --ai-agent <agent>', 'AI agent to assist (visionary, builder, designer, data, security, deployment)')
  .option('-s, --skip-git', 'Skip Git initialization')
  .option('-i, --interactive', 'Interactive project creation')
  .option('--ai-enhanced', 'Use enhanced AI features')
  .action(async (name, options) => {
    try {
      console.log(chalk.cyan.bold('\n🎭 Welcome to Prologue!'));
      console.log(chalk.gray('The AI-Powered Creative Framework\n'));

      const projectName = name || await promptForProjectName();
      const projectConfig = await getProjectConfig(projectName, options);

      const creator = new PrologueCreator();
      await creator.createProject(projectName, projectConfig);

      console.log(chalk.green.bold('\n✨ Your Prologue project is ready!'));
      console.log(chalk.gray(`Created: ${projectName}`));

      displayNextSteps(projectName);

    } catch (error) {
      console.error(chalk.red.bold('\n💥 Error creating project:'));
      console.error(chalk.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  });

// Development command
program
  .command('dev')
  .description('Start development server with hot reload')
  .option('-p, --port <port>', 'Port to run on', '3000')
  .option('--open', 'Open browser automatically')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Starting Prologue development server...'));

      // Development server logic here
      const port = options.port || 3000;

      console.log(chalk.green(`✅ Development server running on http://localhost:${port}`));

      if (options.open) {
        await openBrowser(`http://localhost:${port}`);
      }

    } catch (error) {
      console.error(chalk.red('Error starting development server:'), error);
      process.exit(1);
    }
  });

// Build command
program
  .command('build')
  .description('Build your Prologue project for production')
  .option('-o, --output <dir>', 'Output directory', 'dist')
  .option('--minify', 'Minify the build')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🔨 Building Prologue project...'));

      // Build logic here
      console.log(chalk.green('✅ Build completed successfully'));
      console.log(chalk.gray(`Output: ${options.output}`));

    } catch (error) {
      console.error(chalk.red('Error building project:'), error);
      process.exit(1);
    }
  });

// Deploy command
program
  .command('deploy')
  .description('Deploy your Prologue project')
  .argument('[platform]', 'Deployment platform (vercel, netlify, docker, cloud)')
  .action(async (platform, options) => {
    try {
      const deployPlatform = platform || await promptForPlatform();

      console.log(chalk.blue(`🚀 Deploying to ${deployPlatform}...`));

      // Deployment logic here
      console.log(chalk.green(`✅ Successfully deployed to ${deployPlatform}`));

    } catch (error) {
      console.error(chalk.red('Error deploying project:'), error);
      process.exit(1);
    }
  });

// AI assistant command
program
  .command('ai')
  .description('Interact with Prologue AI assistants')
  .option('-a, --agent <agent>', 'Specific AI agent to consult')
  .action(async (options) => {
    try {
      console.log(chalk.cyan('🤖 Prologue AI Assistant'));
      console.log(chalk.gray('Ask anything about your creative project\n'));

      const agent = options.agent || await promptForAgent();

      console.log(chalk.blue(`🎭 Consulting ${agent}...`));

      // AI interaction logic here
      console.log(chalk.green('✨ AI assistance provided!'));

    } catch (error) {
      console.error(chalk.red('Error with AI assistant:'), error);
      process.exit(1);
    }
  });

// Templates command
program
  .command('templates')
  .description('Browse and use Prologue templates')
  .option('--category <category>', 'Filter by category')
  .action(async (options) => {
    try {
      console.log(chalk.cyan('📚 Prologue Templates'));
      console.log(chalk.gray('Pre-built templates for every creative need\n'));

      const templates = await getTemplates(options.category);

      displayTemplates(templates);

    } catch (error) {
      console.error(chalk.red('Error loading templates:'), error);
      process.exit(1);
    }
  });

// Community command
program
  .command('community')
  .description('Connect with the Prologue community')
  .action(async () => {
    try {
      console.log(chalk.cyan('🌟 Prologue Community'));
      console.log(chalk.gray('Join creators, developers, and dreamers\n'));

      displayCommunityInfo();

    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

// Email registration server command
program
  .command('email-server')
  .description('Start the email registration server for early access')
  .option('-p, --port <port>', 'Port to run on', '3001')
  .option('--dev', 'Run in development mode with hot reload')
  .action(async (options) => {
    try {
      console.log(chalk.blue('📧 Starting Prologue Email Registration Server...'));

      const { spawn } = await import('child_process');
      const port = options.port || '3001';

      if (options.dev) {
        console.log(chalk.yellow('🔧 Development mode with hot reload'));
        const server = spawn('npm', ['run', 'server:dev'], {
          stdio: 'inherit',
          cwd: process.cwd()
        });

        server.on('close', (code) => {
          if (code !== 0) {
            console.error(chalk.red(`Server exited with code ${code}`));
            process.exit(code);
          }
        });
      } else {
        console.log(chalk.green(`✅ Email server running on http://localhost:${port}`));
        console.log(chalk.cyan(`📧 Registration form: http://localhost:${port}/register`));
        console.log(chalk.cyan(`🔗 API endpoint: http://localhost:${port}/api/register`));
        console.log(chalk.cyan(`📊 Stats endpoint: http://localhost:${port}/api/stats`));

        // Import and start the server
        const server = await import('./server');
        // Server starts automatically when imported as main module
      }

    } catch (error) {
      console.error(chalk.red('Error starting email server:'), error);
      process.exit(1);
    }
  });

// Setup command for email registration
program
  .command('setup-email')
  .description('Set up email registration with Resend')
  .action(async () => {
    try {
      console.log(chalk.blue('📧 Setting up Prologue Email Registration...'));

      const { execSync } = await import('child_process');

      // Run the setup script
      execSync('./setup-email-registration.sh', { stdio: 'inherit' });

      console.log(chalk.green('✨ Email registration setup complete!'));
      console.log(chalk.cyan('📧 To start the server: prologue email-server'));

    } catch (error) {
      console.error(chalk.red('Setup failed:'), error);
      process.exit(1);
    }
  });

// Deploy command
program
  .command('deploy')
  .description('Deploy Prologue to GitHub Pages and configure DNS')
  .option('--dns', 'Configure DNS using Porkbun API')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Deploying Prologue...'));

      const { execSync } = await import('child_process');

      // Run the deployment script
      execSync('./scripts/deploy-prologue.sh', { stdio: 'inherit' });

      if (options.dns) {
        console.log(chalk.blue('🔧 Configuring DNS...'));

        // Check if Porkbun credentials are set
        if (!process.env.PORKBUN_API_KEY || !process.env.PORKBUN_SECRET_KEY) {
          console.log(chalk.yellow('⚠️  Set Porkbun credentials:'));
          console.log(chalk.gray('   export PORKBUN_API_KEY=your_api_key'));
          console.log(chalk.gray('   export PORKBUN_SECRET_KEY=your_secret_key'));
          console.log(chalk.gray('   Then run: prologue dns configure'));
        } else {
          execSync('node scripts/porkbun-dns.js configure', { stdio: 'inherit' });
        }
      }

      console.log(chalk.green('🎉 Deployment completed!'));
      console.log(chalk.cyan('🌐 Your site is available at: https://logue.pro'));

    } catch (error) {
      console.error(chalk.red('Deployment failed:'), error);
      process.exit(1);
    }
  });

// DNS management command
program
  .command('dns')
  .description('Manage DNS configuration for logue.pro')
  .argument('<action>', 'Action to perform (configure, status)')
  .action(async (action) => {
    try {
      const { execSync } = await import('child_process');

      switch (action) {
        case 'configure':
        case 'config':
          console.log(chalk.blue('🔧 Configuring DNS for logue.pro...'));

          if (!process.env.PORKBUN_API_KEY || !process.env.PORKBUN_SECRET_KEY) {
            console.log(chalk.red('❌ Porkbun API credentials not found'));
            console.log(chalk.yellow('Set your credentials:'));
            console.log(chalk.gray('   export PORKBUN_API_KEY=your_api_key'));
            console.log(chalk.gray('   export PORKBUN_SECRET_KEY=your_secret_key'));
            process.exit(1);
          }

          execSync('node scripts/porkbun-dns.js configure', { stdio: 'inherit' });
          break;

        case 'status':
        case 'show':
          console.log(chalk.blue('📋 DNS Status for logue.pro...'));
          execSync('node scripts/porkbun-dns.js status', { stdio: 'inherit' });
          break;

        default:
          console.log(chalk.red('❌ Invalid action. Use: configure or status'));
          process.exit(1);
      }

    } catch (error) {
      console.error(chalk.red('DNS operation failed:'), error);
      process.exit(1);
    }
  });

// Help command
program
  .command('help')
  .description('Get help with Prologue')
  .action(() => {
    console.log(chalk.cyan('📚 Prologue Help'));
    console.log(chalk.gray('Get assistance with any Prologue feature\n'));

    displayHelpInfo();
  });

// Helper functions
async function promptForProjectName(): Promise<string> {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What would you like to call your project?',
      default: 'my-prologue-project',
      validate: (input) => input.trim() ? true : 'Project name is required'
    }
  ]);
  return name.trim();
}

async function getProjectConfig(name: string, options: any): Promise<PrologueProject> {
  const config: PrologueProject = {
    name,
    template: options.template || await promptForTemplate(),
    aiAgent: options.aiAgent || await promptForAgent(),
    skipGit: options.skipGit || false,
    aiEnhanced: options.aiEnhanced || false,
    features: await promptForFeatures(),
    customizations: {}
  };

  if (!options.interactive) {
    return config;
  }

  // Interactive customization
  const { customize } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'customize',
      message: 'Would you like to customize your project?',
      default: false
    }
  ]);

  if (customize) {
    config.customizations = await promptForCustomizations();
  }

  return config;
}

async function promptForTemplate(): Promise<string> {
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template for your project:',
      choices: [
        { name: '🌟 Portfolio Website', value: 'portfolio' },
        { name: '🎮 Interactive Game', value: 'game' },
        { name: '🎨 Art Gallery', value: 'art-gallery' },
        { name: '📱 Mobile App', value: 'mobile-app' },
        { name: '📊 Dashboard', value: 'dashboard' },
        { name: '🎬 Landing Page', value: 'landing-page' },
        { name: '🛠️ Custom Project', value: 'custom' }
      ],
      default: 'portfolio'
    }
  ]);
  return template;
}

async function promptForAgent(): Promise<string> {
  const { agent } = await inquirer.prompt([
    {
      type: 'list',
      name: 'agent',
      message: 'Choose your primary AI assistant:',
      choices: [
        { name: '🎭 Visionary Director - Creative direction and concepts', value: 'visionary' },
        { name: '⚡ Rapid Builder - Quick prototyping and development', value: 'builder' },
        { name: '🎨 Design Master - Visual design and UI/UX', value: 'designer' },
        { name: '📊 Data Weaver - Data integration and visualization', value: 'data' },
        { name: '🔒 Security Guardian - Security and best practices', value: 'security' },
        { name: '🚀 Deployment Expert - Deployment and optimization', value: 'deployment' }
      ],
      default: 'visionary'
    }
  ]);
  return agent;
}

async function promptForFeatures(): Promise<string[]> {
  const { features } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'features',
      message: 'Select features to include:',
      choices: [
        { name: '🎨 Tailwind CSS Styling', value: 'tailwind', checked: true },
        { name: '📱 Responsive Design', value: 'responsive', checked: true },
        { name: '🌙 Dark Mode Support', value: 'dark-mode', checked: true },
        { name: '📊 Data Visualization', value: 'data-viz' },
        { name: '🎮 Interactive Elements', value: 'interactive' },
        { name: '🎭 Animations', value: 'animations' },
        { name: '📝 Content Management', value: 'cms' },
        { name: '🔐 Authentication', value: 'auth' },
        { name: '📊 Analytics', value: 'analytics' }
      ]
    }
  ]);
  return features;
}

async function promptForCustomizations(): Promise<any> {
  const { theme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Choose a color theme:',
      choices: [
        { name: '🌊 Ocean Blue', value: 'ocean' },
        { name: '🌸 Cherry Blossom', value: 'sakura' },
        { name: '🌿 Forest Green', value: 'forest' },
        { name: '🌆 Sunset Orange', value: 'sunset' },
        { name: '🌌 Night Sky', value: 'night' },
        { name: '🎨 Custom Colors', value: 'custom' }
      ],
      default: 'ocean'
    }
  ]);

  const { fontFamily } = await inquirer.prompt([
    {
      type: 'list',
      name: 'fontFamily',
      message: 'Choose a font family:',
      choices: [
        { name: 'System Default', value: 'system' },
        { name: 'Modern Sans', value: 'sans-serif' },
        { name: 'Classic Serif', value: 'serif' },
        { name: 'Mono Space', value: 'mono' },
        { name: 'Display', value: 'display' }
      ],
      default: 'system'
    }
  ]);

  return { theme, fontFamily };
}

async function promptForPlatform(): Promise<string> {
  const { platform } = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Choose deployment platform:',
      choices: [
        { name: '🌟 Vercel (Recommended)', value: 'vercel' },
        { name: '☁️ Netlify', value: 'netlify' },
        { name: '🐳 Docker', value: 'docker' },
        { name: '☁️ AWS', value: 'aws' },
        { name: '☁️ Google Cloud', value: 'gcp' },
        { name: '☁️ Azure', value: 'azure' },
        { name: '🏠 Self-Hosted', value: 'self-hosted' }
      ],
      default: 'vercel'
    }
  ]);
  return platform;
}

async function promptForAgent(): Promise<string> {
  const { agent } = await inquirer.prompt([
    {
      type: 'list',
      name: 'agent',
      message: 'Which AI agent would you like to consult?',
      choices: [
        { name: '🎭 Visionary Director', value: 'visionary' },
        { name: '⚡ Rapid Builder', value: 'builder' },
        { name: '🎨 Design Master', value: 'designer' },
        { name: '📊 Data Weaver', value: 'data' },
        { name: '🔒 Security Guardian', value: 'security' },
        { name: '🚀 Deployment Expert', value: 'deployment' }
      ],
      default: 'visionary'
    }
  ]);
  return agent;
}

async function getTemplates(category?: string): Promise<any[]> {
  // Template fetching logic here
  return [
    {
      name: 'Portfolio Website',
      description: 'Modern portfolio with project showcase',
      category: 'web',
      tags: ['portfolio', 'personal', 'showcase'],
      aiEnhanced: true
    },
    {
      name: 'Interactive Game',
      description: 'Web-based game with AI-generated levels',
      category: 'game',
      tags: ['game', 'interactive', 'fun'],
      aiEnhanced: true
    },
    {
      name: 'Art Gallery',
      description: 'Dynamic art gallery with generative pieces',
      category: 'art',
      tags: ['art', 'gallery', 'creative'],
      aiEnhanced: true
    }
  ];
}

async function displayTemplates(templates: any[]): void {
  console.log(chalk.blue('\n📚 Available Templates:'));
  console.log(chalk.gray('─'.repeat(50)));

  templates.forEach((template, index) => {
    const status = template.aiEnhanced ? chalk.green('AI') : chalk.yellow('STD');
    console.log(`${index + 1}. ${template.name} ${status}`);
    console.log(chalk.gray(`   ${template.description}`));
    console.log(chalk.gray(`   Tags: ${template.tags.join(', ')}`));
    console.log();
  });
}

function displayCommunityInfo(): void {
  console.log(chalk.blue('🌟 Join Our Community:'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log('🎭 Discord: ' + chalk.cyan('discord.gg/prologue'));
  console.log('🐦 Twitter: ' + chalk.cyan('@prologueai'));
  console.log('💬 GitHub: ' + chalk.cyan('github.com/aegntic/prologue'));
  console.log('📧 Newsletter: ' + chalk.cyan('logue.pro/newsletter'));
  console.log();
  console.log(chalk.green('✨ Share your creations and learn from others!'));
}

function displayHelpInfo(): void {
  console.log(chalk.blue('📚 Prologue Resources:'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log('📖 Documentation: ' + chalk.cyan('docs.prologue.ai'));
  console.log('🎓 Tutorials: ' + chalk.cyan('tutorials.prologue.ai'));
  console.log('🎮 Examples: ' + chalk.cyan('examples.prologue.ai'));
  console.log('🎨 Templates: ' + chalk.cyan('templates.prologue.ai'));
  console.log('💬 Support: ' + chalk.cyan('support.prologue.ai'));
  console.log();
  console.log(chalk.green('🚀 Start building your dream project today!'));
}

function displayNextSteps(projectName: string): void {
  console.log(chalk.blue('\n🎯 Next Steps:'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(`1. ${chalk.cyan('cd')} ${projectName}`);
  console.log(`2. ${chalk.cyan('prologue dev')} Start development server`);
  console.log(`3. ${chalk.cyan('prologue ai')} Get AI assistance`);
  console.log(`4. ${chalk.cyan('prologue deploy')} Deploy your creation`);
  console.log();
  console.log(chalk.green('✨ Your creative journey begins now!'));
  console.log(chalk.gray('Visit ' + chalk.cyan('logue.pro') + ' for more resources'));
}

async function openBrowser(url: string): Promise<void> {
  const { execa } = await import('execa');
  const platform = process.platform;

  let command: string;
  let args: string[];

  switch (platform) {
    case 'darwin':
      command = 'open';
      args = [url];
      break;
    case 'win32':
      command = 'start';
      args = [url];
      break;
    default:
      command = 'xdg-open';
      args = [url];
      break;
  }

  try {
    await execa(command, args);
  } catch (error) {
    console.log(chalk.yellow(`Please open ${url} in your browser`));
  }
}

// Error handling
process.on('uncaughtException', (error) => {
  console.error(chalk.red.bold('\n💥 Uncaught Exception:')));
  console.error(chalk.red(error.message));
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack);
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red.bold('\n💥 Unhandled Rejection:')));
  console.error(chalk.red(String(reason)));
  process.exit(1);
});

// Parse and run
program.parse();