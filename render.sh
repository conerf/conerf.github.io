#!/bin/bash

base_path=~/experiments/supplementary
suffix=supplementary/frames

datasets=(
    2-metronomes-slo-mo
    better-bg
    face-2-attributes
    metronome-slo-mo
    yuhe
    processed-trio-train-color-fixed
)

for dataset in ${datasets[@]}
do
    python combinine_videos.py \
        ${base_path}/ours-better-bg-enc_attr_mask/${suffix} \
        frames/${dataset} \
        videos/real/${dataset}/ours.mp4 \
        --text texts/ours.jpg

    python combinine_videos.py \
        ${base_path}/hypernerf_ds-${dataset}/${suffix} \
        frames/${dataset} \
        videos/real/${dataset}/hypernerf_ds.mp4 \
        --text texts/hypernerf_ds.jpg

    python combinine_videos.py \
        ${base_path}/hypernerf_ds_proj-${dataset}/${suffix} \
        frames/${dataset} \
        videos/real/${dataset}/hypernerf_ds_proj.mp4 \
        --text texts/hypernerf_ds_proj.jpg

    python combinine_videos.py \
        ${base_path}/ours-better-bg-enc_attr_mask/${suffix} \
        ${base_path}/hypernerf_ds-${dataset}/${suffix} \
        ${base_path}/hypernerf_ds_proj-${dataset}/${suffix} \
        frames/${dataset} \
        videos/real/${dataset}/combined.mp4 \
        --text texts/ours.jpg texts/hypernerf_ds.jpg texts/hypernerf_ds_proj.jpg 
done


