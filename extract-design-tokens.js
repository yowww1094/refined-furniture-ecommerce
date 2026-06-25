import fs from 'fs';

try {
  // Read the Figma JSON file
  const data = JSON.parse(fs.readFileSync('designs/figma.json', 'utf8'));

  // Initialize collections for design tokens
  const colors = new Set();
  const textStyles = [];
  const effects = [];
  const grids = [];

  // Helper to extract color from RGBA values
  const getColorFromRGB = (r, g, b, a = 1) => {
    const hex = ((Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255)).toString(16).padStart(6, '0');
    return `#${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
  };

  // Traverse the document to find styles
  const traverse = (node) => {
    // Check for fills (background colors)
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.visible !== false) {
          const color = getColorFromRGB(fill.color.r, fill.color.g, fill.color.b, fill.opacity || fill.color.a || 1);
          colors.add(color);
        }
      });
    }

    // Check for strokes (border colors)
    if (node.strokes && Array.isArray(node.strokes)) {
      node.strokes.forEach(stroke => {
        if (stroke.type === 'SOLID' && stroke.visible !== false) {
          const color = getColorFromRGB(stroke.color.r, stroke.color.g, stroke.color.b, stroke.opacity || stroke.color.a || 1);
          colors.add(color);
        }
      });
    }

    // Check for text styles
    if (node.type === 'TEXT' && node.fontName) {
      textStyles.push({
        fontFamily: node.fontName.family,
        fontWeight: node.fontName.style,
        fontSize: node.fontSize,
        lineHeight: node.lineHeightPx || Math.round(node.fontSize * 1.2),
        letterSpacing: node.letterSpacing || 0,
        textAlign: node.textAlignHorizontal || 'LEFT',
        color: node.fills && Array.isArray(node.fills) && node.fills[0] ?
          getColorFromRGB(
            node.fills[0].color.r,
            node.fills[0].color.g,
            node.fills[0].color.b,
            node.fills[0].opacity || node.fills[0].color.a || 1
          ) : '#000000'
      });
    }

    // Check for effects (shadows, blur, etc.)
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach(effect => {
        if (effect.visible !== false) {
          effects.push({
            type: effect.type || 'UNKNOWN',
            radius: effect.radius || 0,
            offset: {
              x: effect.offset ? effect.offset.x : 0,
              y: effect.offset ? effect.offset.y : 0
            },
            color: effect.color ?
              getColorFromRGB(effect.color.r, effect.color.g, effect.color.b, effect.color.a) :
              '#000000',
            opacity: effect.opacity !== undefined ? effect.opacity : 1
          });
        }
      });
    }

    // Check for layout grids
    if (node.layoutGrids && Array.isArray(node.layoutGrids)) {
      node.layoutGrids.forEach(grid => {
        if (grid.visible !== false) {
          grids.push({
            pattern: grid.pattern || 'GRID',
            sectionSize: grid.sectionSize > 0 ? grid.sectionSize : 0,
            offset: grid.offset || 0,
            gutterSize: grid.gutterSize || 0,
            count: grid.count || 0
          });
        }
      });
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => traverse(child));
    }
  };

  // Start traversal from document
  // Start traversal from document
  if (data.document && data.document.children) {
    data.document.children.forEach(child => traverse(child));
  }

  // Also look for explicit styles in the document
  if (data.document.styles && Array.isArray(data.document.styles)) {
    data.document.styles.forEach(style => {
      // Process different style types
      if (style.styleType === 'FILL') {
        if (Array.isArray(style.paints)) {
          style.paints.forEach(paint => {
            if (paint.type === 'SOLID' && paint.visible !== false) {
              const color = getColorFromRGB(paint.color.r, paint.color.g, paint.color.b, paint.opacity || paint.color.a || 1);
              colors.add(color);
            }
          });
        }
      } else if (style.styleType === 'TEXT') {
        textStyles.push({
          fontFamily: style.fontName?.family || 'Unknown',
          fontWeight: style.fontName?.style || 'Regular',
          fontSize: style.fontSize,
          lineHeight: style.lineHeightPx || Math.round(style.fontSize * 1.2),
          letterSpacing: style.letterSpacing || 0,
          textAlign: style.textAlignHorizontal || 'LEFT',
          color: style.fills && Array.isArray(style.fills) && style.fills[0] ?
            getColorFromRGB(
              style.fills[0].color.r,
              style.fills[0].color.g,
              style.fills[0].color.b,
              style.fills[0].opacity || style.fills[0].color.a || 1
            ) : '#000000'
        });
      } else if (style.styleType === 'EFFECT') {
        if (Array.isArray(style.effects)) {
          style.effects.forEach(effect => {
            if (effect.visible !== false) {
              effects.push({
                type: effect.type || 'UNKNOWN',
                radius: effect.radius || 0,
                offset: {
                  x: effect.offset ? effect.offset.x : 0,
                  y: effect.offset ? effect.offset.y : 0
                },
                color: effect.color ?
                  getColorFromRGB(effect.color.r, effect.color.g, effect.color.b, effect.color.a) :
                  '#000000',
                opacity: effect.opacity !== undefined ? effect.opacity : 1
              });
            }
          });
        }
      }
    });
  }

  // Convert sets to arrays for JSON serialization
  const uniqueColors = Array.from(colors).sort();

  // Create the design tokens object
  const designTokens = {
    colors: uniqueColors,
    textStyles: textStyles.slice(0, 20), // Limit to first 20 for readability
    effects: effects.slice(0, 20), // Limit to first 20
    grids: grids.slice(0, 10) // Limit to first 10
  };

  // Write to a JSON file
  fs.writeFileSync('design-tokens.json', JSON.stringify(designTokens, null, 2));
  console.log('Design tokens extracted successfully!');
  console.log(`Found ${uniqueColors.length} unique colors`);
  console.log(`Found ${textStyles.length} text styles`);
  console.log(`Found ${effects.length} effects`);
  console.log(`Found ${grids.length} grids`);

} catch (error) {
  console.error('Error extracting design tokens:', error.message);
  process.exit(1);
}