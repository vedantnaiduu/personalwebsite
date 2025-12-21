# Project Images

Place project images in this directory.

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 1200x600px or similar aspect ratio (2:1)
- **File Naming**: Use kebab-case (e.g., `social-oracle.jpg`, `voice-maintenance-agent.png`)

## Usage in Projects

To add an image to a project, include the `image` and `imageAlt` properties:

```typescript
{
  title: 'Project Name',
  image: '/images/projects/project-name.jpg',
  imageAlt: 'Description of the image',
  // ... other properties
}
```

## Example

```typescript
{
  title: 'Social Oracle',
  image: '/images/projects/social-oracle.jpg',
  imageAlt: 'Social Oracle platform dashboard showing AI-powered recommendations',
  // ... rest of project data
}
```

