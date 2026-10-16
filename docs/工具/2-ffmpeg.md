---
title: ffmpeg
sidebar_position: 2
---



## 开发



## 下载

下载地址  https://ffmpeg.org/download.html#build-windows

点击  Windows builds from gyan.dev

找到 release builds 下边下载 ffmpeg-release-essentials.zip

添加环境变量

## 命令

```shell
# mp4视频 转mp3音频
ffmpeg -i input.mp4 -vn -c:a libmp3lame output.mp3

# 解析
-i input.mp4：-i 指定输入文件，即源视频。
-vn：-vn 是 “video none” 的缩写，意思是禁用视频流，输出时忽略视频部分。
-c:a libmp3lame：-c:a 指定音频编码器（codec for audio），这里选择 libmp3lame，这是生成 MP3 音频的标准编码器。
output.mp3：最后是输出文件名，根据 .mp3 后缀自动选择MP3封装格式。
```

### 基础操作
*   **格式转换**：自动推断输出格式，进行转码。
    
    ```bash
    ffmpeg -i input.mov output.mp4
    ```
*   **查看文件信息**：不进行转码，只打印元数据。
    ```bash
    ffmpeg -i input.mp4
    ```
*   **流复制（无损快速转换容器）**：仅更换容器格式（如 mkv 转 mp4），不重新编码，速度极快。
    ```bash
    ffmpeg -i input.mkv -c copy output.mp4
    ```

#### 音频处理
*   **提取音频（保留原编码）**：如果你想保留原始音频质量，不想重新编码。
    ```bash
    ffmpeg -i input.mp4 -vn -c:a copy output.m4a
    ```
*   **提取音频（转为 MP3）**：你命令中的用法。
    ```bash
    ffmpeg -i input.mp4 -vn -c:a libmp3lame output.mp3
    ```
*   **移除视频（保留音频并处理）**：与提取音频类似，但可能对音频进行滤镜处理。
    ```bash
    ffmpeg -i input.mp4 -an output.mp4
    ```
*   **调节音量**：将音量提高 1.5 倍。
    ```bash
    ffmpeg -i input.mp3 -af "volume=1.5" output.mp3
    ```

### 视频剪辑与处理
*   **精确裁剪（重新编码）**：从第 30 秒开始，截取 10 秒，精确到帧。
    
    ```bash
    ffmpeg -ss 00:00:30 -i input.mp4 -t 00:00:10 -c:v libx264 -c:a aac clip.mp4
    ```
*   **快速裁剪（流复制）**：同样截取片段，但速度极快，仅在关键帧处切割。
    ```bash
    ffmpeg -ss 00:00:30 -i input.mp4 -t 00:00:10 -c copy clip.mp4
    ```
*   **修改分辨率**：将视频缩放到 1280x720。
    
    ```bash
    ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4
    ```
*   **压缩视频（控制质量）**：通过 `-crf` 参数控制质量，数值越小质量越好（18-28 是常用范围）。
    ```bash
    ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4
    ```
*   **添加水印**：将 logo.png 叠加到视频左上角。
    ```bash
    ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:10" output.mp4
    ```

### 拼接与合并
*   **快速拼接（格式一致）**：先将文件名写入 `list.txt`，然后合并。
    ```bash
    ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
    ```
*   **合并音视频**：将视频流和音频流合并为一个文件。
    ```bash
    ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac output.mp4
    ```

### 流媒体与直播
*   **推流到 RTMP 服务器**：常用于直播。
    ```bash
    ffmpeg -re -i input.mp4 -c copy -f flv rtmp://server/live/streamKey
    ```
*   **生成 HLS（M3U8）切片**：用于流媒体分发。
    ```bash
    ffmpeg -i input.mp4 -codec: copy -start_number 0 -f hls playlist.m3u8
    ```

### 性能与调试
*   **加快编码速度**：使用 `-preset` 参数，如 `ultrafast`、`fast`。
    ```bash
    ffmpeg -i input.mp4 -c:v libx264 -preset fast output.mp4
    ```
*   **查看可用编解码器**：
    ```bash
    ffmpeg -codecs
    ```
*   **查看可用滤镜**：
    ```bash
    ffmpeg -filters
    ```

