package image

import (
	"context"
	"gallery/internal/contract"
	"os"
	"path/filepath"
	"strings"
	"time"
)

var _ contract.ImageProvider = &Local{}

type Local struct {
	imagesPath  string
	collections []contract.Collection
	nextRefresh time.Time
}

func NewLocal(imagesPath string) *Local {
	return &Local{
		imagesPath:  imagesPath,
		nextRefresh: time.Now(),
	}
}

func (l *Local) Collections(ctx context.Context) ([]contract.Collection, error) {
	// TODO: lock
	now := time.Now()
	if now.Before(l.nextRefresh) {
		return l.collections, nil
	}

	collections, err := l.buildCollections(l.imagesPath)
	if err != nil {
		return nil, err
	}

	l.collections = collections
	l.nextRefresh = time.Now().Add(time.Second * 10)

	return l.collections, nil
}

// 扫描图集
func (l Local) buildCollections(imagesPath string) ([]contract.Collection, error) {
	collections := make([]contract.Collection, 0)

	// 读取根目录下的所有条目
	entries, err := os.ReadDir(imagesPath)
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		dirName := entry.Name()
		dirPath := filepath.Join(imagesPath, dirName)

		collection := contract.Collection{
			Id:     dirName, // TODO: hash(dirName)
			Title:  dirName,
			Images: []string{},
		}

		files, err := os.ReadDir(dirPath)
		if err != nil {
			return nil, err
		}

		// 遍历文件，添加图片到集合中
		for _, file := range files {
			// 跳过目录和隐藏文件
			// 暂时不支持子目录
			if file.IsDir() || strings.HasPrefix(file.Name(), ".") {
				continue
			}

			// 检查文件扩展名是否为图片
			ext := strings.ToLower(filepath.Ext(file.Name()))
			if ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".gif" || ext == ".bmp" || ext == ".webp" || ext == ".svg" {
				// 构建图片路径（相对于images目录）
				imagePath := filepath.Join(dirName, file.Name())
				imagePath = strings.ReplaceAll(imagePath, "#", "%23") // TODO: URIENCODE
				collection.Images = append(collection.Images, "/images/"+imagePath)
			}
		}

		// 只添加包含图片的集合
		if len(collection.Images) > 0 {
			collections = append(collections, collection)
		}
	}

	return collections, nil
}
