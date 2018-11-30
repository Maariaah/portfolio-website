<?php
$total_items = glob("..\works\*", GLOB_ONLYDIR);
echo  json_encode($total_items);


