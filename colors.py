import colorsys

# List of gray colors, from lightest (1) to darkest (13)
gray_colors = {
    1: "#ffffff",
    2: "#fafafa",
    3: "#f5f5f5",
    4: "#f0f0f0",
    5: "#d9d9d9",
    6: "#bfbfbf",
    7: "#8c8c8c",
    8: "#595959",
    9: "#434343",
    10: "#262626",
    11: "#1f1f1f",
    12: "#141414",
    13: "#000000"
}

# Function to convert hex to RGB


def hex_to_rgb(hex_value):
    hex_value = hex_value.lstrip('#')
    return tuple(int(hex_value[i:i + 2], 16) for i in (0, 2, 4))

# Function to convert RGB to HSL


def rgb_to_hsl(r, g, b):
    r_scaled, g_scaled, b_scaled = r / 255.0, g / 255.0, b / 255.0
    return colorsys.rgb_to_hls(r_scaled, g_scaled, b_scaled)

# Function to convert HSL back to RGB


def hsl_to_rgb(h, l, s):
    rgb = colorsys.hls_to_rgb(h, l, s)
    return tuple(int(val * 255) for val in rgb)

# Function to adjust lightness for better contrast


def adjust_lightness(h, l, s):
    # Twitch algorithm - adjusting lightness to ensure contrast
    if l > 0.8:  # Too light
        l = 0.8  # Adjust down
    elif l < 0.2:  # Too dark
        l = 0.2  # Adjust up
    return h, l, s

# Function to calculate relative luminance


def relative_luminance(r, g, b):
    rs = r / 255.0
    gs = g / 255.0
    bs = b / 255.0
    rs = rs / 12.92 if rs <= 0.03928 else ((rs + 0.055) / 1.055) ** 2.4
    gs = gs / 12.92 if gs <= 0.03928 else ((gs + 0.055) / 1.055) ** 2.4
    bs = bs / 12.92 if bs <= 0.03928 else ((bs + 0.055) / 1.055) ** 2.4
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs

# Function to calculate contrast ratio between two colors


def contrast_ratio(lum1, lum2):
    return (max(lum1, lum2) + 0.05) / (min(lum1, lum2) + 0.05)

# Function to determine the best fitting gray color using HSL adjustments


def get_best_gray_color(hex_value):
    r, g, b = hex_to_rgb(hex_value)

    # Convert background color to HSL
    h, l, s = rgb_to_hsl(r, g, b)

    # Adjust the lightness for better contrast using the Twitch approach
    h, l, s = adjust_lightness(h, l, s)

    # Convert adjusted HSL back to RGB
    r_adj, g_adj, b_adj = hsl_to_rgb(h, l, s)

    # Calculate the relative luminance for the adjusted background color
    background_luminance = relative_luminance(r_adj, g_adj, b_adj)

    # WCAG contrast requirement is typically 4.5 for small text
    min_contrast = 4.5
    best_color_number = None

    # Iterate over gray colors from lightest to darkest
    for number, gray_hex in gray_colors.items():
        gray_r, gray_g, gray_b = hex_to_rgb(gray_hex)
        gray_luminance = relative_luminance(gray_r, gray_g, gray_b)

        contrast = contrast_ratio(background_luminance, gray_luminance)

        # Find the first gray that meets the minimum contrast requirement
        if contrast >= min_contrast:
            best_color_number = number
            break  # Choose the first color that meets the contrast ratio

    return best_color_number


# Example usage
background_hex = input("Background Color: ")
best_gray_color = get_best_gray_color(background_hex)
if best_gray_color:
    print(f"The minimum acceptable gray color for text is: {best_gray_color}")
else:
    print("No suitable gray color found.")
