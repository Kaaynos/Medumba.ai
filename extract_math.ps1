$destDir = "C:\Users\ndjan\Downloads\medumba\extract_math"
[xml]$ss = Get-Content "$destDir\xl\sharedStrings.xml" -Encoding UTF8
$strings = @()
foreach ($si in $ss.sst.si) {
    if ($si.t) { $strings += $si.t }
    elseif ($si.r) { $strings += ($si.r | ForEach-Object { $_.t }) -join "" }
}
[xml]$sheet = Get-Content "$destDir\xl\worksheets\sheet1.xml" -Encoding UTF8
$rows = $sheet.worksheet.sheetData.row
$output = @()
foreach ($row in $rows) {
    $cells = $row.c
    $rowData = @()
    foreach ($cell in $cells) {
        if ($cell.t -eq "s") {
            $idx = [int]$cell.v
            if ($idx -lt $strings.Count) { $rowData += $strings[$idx] }
            else { $rowData += "" }
        } elseif ($cell.v) { $rowData += $cell.v }
        else { $rowData += "" }
    }
    $output += $rowData -join " | "
}
$output | Out-File "C:\Users\ndjan\Downloads\medumba\math_lexique_extracted.txt" -Encoding utf8
"MATH_DONE:$($output.Count)"
