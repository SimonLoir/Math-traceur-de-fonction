<?php
class image_builder
{
    private $filename = "image.png";
    private $options = [
        "center" => [
            "x" => 0,
            "y" => 0
        ],
        "int" => 50,
        "width" => 2000,
        "height" => 2000
    ];

    public function build($x_result)
    {

        $x_result = create_function('$x', 'return ' . str_replace("x", "\$x", str_replace("Math.", "", $x_result)) . ";");

        $image = @ImageCreate($this->options["width"], $this->options["height"]);

        $background_color = ImageColorAllocate($image, 255, 255, 255);

        $line_color = ImageColorAllocate($image, 233, 0, 0);
        $line_grid_color = ImageColorAllocate($image, 121, 121, 121);
        $graph_color = ImageColorAllocate($image, 207, 145, 29);


        for ($i = $this->options["width"] / 2; $i < $this->options["width"]; $i += $this->options["int"]) {
            $this->thickline($image, $i, 0, $i, $this->options["height"], $line_grid_color, 0.5);
        }

        for ($i = $this->options["width"] / 2; $i > 0; $i -= $this->options["int"]) {
            $this->thickline($image, $i, 0, $i, $this->options["height"], $line_grid_color, 0.5);
        }

        for ($i = $this->options["height"] / 2; $i < $this->options["height"]; $i += $this->options["int"]) {
            $this->thickline($image, 0, $i, $this->options["width"], $i, $line_grid_color, 0.5);
        }

        for ($i = $this->options["height"] / 2; $i > 0; $i -= $this->options["int"]) {
            $this->thickline($image, 0, $i, $this->options["width"], $i, $line_grid_color, 0.5);
        }

        $this->thickline($image, $this->options["width"] / 2, 0, $this->options["width"] / 2, $this->options["height"], $line_color, 5);
        $this->thickline($image, 0, $this->options["height"] / 2, $this->options["width"], $this->options["height"] / 2, $line_color, 5);

        $start = $this->getValue($x_result, 0);
        $start_minus = $this->getValue($x_result, 0);

        $int = 0.05;

        for ($i = 0; $i < $this->options["width"] / $this->options["int"]; $i += $int) {
            $old_start = $start;
            $start = $this->getValue($x_result, $i);

            $x1 = ($this->options["width"] / 2) + (($i - $int) * $this->options["int"]);
            $x2 = ($this->options["width"] / 2) + (($i) * $this->options["int"]);
            $y1 = ($this->options["height"] / 2) - ($old_start * $this->options["int"]);
            $y2 = ($this->options["height"] / 2) - ($start * $this->options["int"]);

            $this->thickline($image, intval($x1), intval($y1), intval($x2), intval($y2), $graph_color);

            $old_start = $start_minus;
            $start_minus = $this->getValue($x_result, -1 * $i);

            $x1 = ($this->options["width"] / 2) + (((-1 * $i) + $int) * $this->options["int"]);
            $x2 = ($this->options["width"] / 2) + (((-1 * $i)) * $this->options["int"]);
            $y1 = ($this->options["height"] / 2) - ($old_start * $this->options["int"]);
            $y2 = ($this->options["height"] / 2) - ($start_minus * $this->options["int"]);

            $this->thickline($image, intval($x1), intval($y1), intval($x2), intval($y2), $graph_color);
        }

        ImagePng($image, $this->filename);
    }

    function __construct($options = null, $filename = null)
    {
        if ($options != null) {
            $this->options = $options;
        }
        if ($filename != null) {
            $this->filename = $filename;
        }
    }

    private function thickline($img, $x1, $y1, $x2, $y2, $color, $thickness = 10)
    {
        $radius = $thickness * 0.5;
        $vx = $x2 - $x1;
        $vy = $y2 - $y1;
        $steps = ceil(.5 + max(abs($vx), abs($vy)));
        $vx /= $steps;
        $vy /= $steps;
        $x = $x1;
        $y = $y1;
        while ($steps-- > 0) {
            imagefilledellipse($img, $x, $y, $radius, $radius, $color);
            $x += $vx;
            $y += $vy;
        }
    }

    private function getValue($array, $start)
    {
        return $array(floatval($start));

        //return floatval($x_result);
    }
}

?>